package main

import (
	"encoding/json"
	"log"
	"net/http"
	"gopkg.in/mgo.v2/bson"
	"github.com/gorilla/mux"
	. "./ccs"
)

var ccs = CCSDB{}

// API Ping Handler
func testPing(w http.ResponseWriter, req *http.Request) {
	fmt.Printf("testping")
	respondWithJson(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
}

//Insert into Database
func generateAmount(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var order Order
	if err := json.NewDecoder(r.Body).Decode(&order); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	order.ID = bson.NewObjectId()
	order.GeneratedAmount = order.OrderCount*5
	if err := ccs.Insert(order); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusCreated, order)
}
 
//Get all the order status
func allOrderStatus(w http.ResponseWriter, r *http.Request) {

	fmt.Println("In order status")
	respondWithJson(w, http.StatusOK,"Hit")

	defer r.Body.Close()

	orders, err := ccs.FindAll()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	fmt.Println("Orders: ", orders)
	respondWithJson(w, http.StatusOK, orders)
}

func processOrders(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var order Order
	var payment Payment
	//params := mux.Vars(r)
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&payment)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Error11")
		return
	}

	order, err1 := ccs.FindByUserId(payment.UserId)
	if err1 != nil {
		respondWithError(w, http.StatusBadRequest, "Error12")
		return
	} else {
		if (payment.EnterAmount == order.GeneratedAmount){
			respondWithJson(w, http.StatusOK, "Order Processed")
			return
		} else {
			respondWithError(w, http.StatusBadRequest, "Error13")
			return	
		}
	}
}

func respondWithError(w http.ResponseWriter, code int, msg string) {
	respondWithJson(w, code, map[string]string{"error": msg})
}

func respondWithJson(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func init() {
	ccs.Connect()
	ccs.ConnecttoPrimary()
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/ping", testPing).Methods("GET")
	r.HandleFunc("/amount", generateAmount).Methods("POST")
	r.HandleFunc("/order", allOrderStatus).Methods("GET")
	r.HandleFunc("/orders", processOrders).Methods("POST")
	if err := http.ListenAndServe(":3001", r); err != nil {
		log.Fatal(err)
	}
}









