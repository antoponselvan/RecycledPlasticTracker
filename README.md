# Solana Recycled Plastic Tracker - Mission to eliminate plastic wastage
Recycling plastic can happen at different stages and it costs additional $ to do the same. This project aims to create a working prototype that enables creation of tracking and certification system using block-chain that makes it feasible to target incentives to plastic recycling at scale 

## 💡Introduction & Motivation
For a feasible recycled plastic recycling tracker following features are needed:
- Easily trusted by various parties involved in the manufacturing value chain
- Minimal Manual intervention for certification 
- Easy to spot and persecute falsifiers

Block-chain's following features makes the above happen:
- DeCentralized nature & immutability brings trust
- Enables to put ownership on manufactuers rather than certifiers
- Makes it easy to hold people accountable for any false information provided


## 🧑‍💼User Story / Experience
There are two paths in using this product:
- Purchaser 
- Manufacturer

Purchaser can key in product details (manufacturer's public key & product serial #) to trace the transformation stages and the eventual recycled plastic content at each stage. (S)He can also see the critical information stored in a normal DB and the one on blockchain. All auxillary info will be only stored in a normal DB and block-chain will only store hash of the information that can be used for verification

The manufacturer can enter the details of the product made (recycled plastic % and etc) and also link to the entity before and after him/her in the manufacturing value chain. The relevant information is stored in a normal DB and the blockchain. The manufacturer has features to be able to see all the product entries made by him in the past as well. 

## 📺 User Interface
![User Interface](/apps/Architecture/UI.jpg)

## 🏗️ Program Architecture
![DataBase Design](/apps/Architecture/DB%20Structure.jpg)