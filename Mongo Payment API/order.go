package main

import "gopkg.in/mgo.v2/bson"

type Order struct {
	ID              bson.ObjectId `bson:"_id" json:"id"`
	UserId          string 	      `bson:"name" json:"name"`
	OrderCount  	int 	      `bson:"count" json:"count"`
	GeneratedAmount int           `bson:"amount" json:"amount"`
}

//var orders map[string] Order

//type orders1 []Order