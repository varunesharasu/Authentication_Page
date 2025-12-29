const { ObjectId } = require("mongodb")
const { getDB } = require("../config/db")

class User {
  static async create(userData) {
    const db = getDB()
    const usersCollection = db.collection("users")

    const result = await usersCollection.insertOne({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return result
  }

  static async findByEmail(email) {
    const db = getDB()
    const usersCollection = db.collection("users")
    return await usersCollection.findOne({ email })
  }

  static async findById(id) {
    const db = getDB()
    const usersCollection = db.collection("users")
    return await usersCollection.findOne({ _id: new ObjectId(id) })
  }

  static async updateById(id, updateData) {
    const db = getDB()
    const usersCollection = db.collection("users")

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    )

    return result.value
  }

  static async deleteById(id) {
    const db = getDB()
    const usersCollection = db.collection("users")
    return await usersCollection.deleteOne({ _id: new ObjectId(id) })
  }
}

module.exports = User
