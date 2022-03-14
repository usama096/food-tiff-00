import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Plan } from '../dashboard/plans/models/plan-model';
import { Product } from '../dashboard/products/models/products';
import { User } from '../dashboard/users/models/users-model';
export class ProductData implements InMemoryDbService {
  createDb() {
    let products = [
      {
        id: 1,
        name: 'Burger',
        description: 'So Sweet. So Good. Sure to bring smiles.',
        imageId: 'assets/images/burgers.png',
        price: 210,
          shortDescription: 'Good for health',
        prodType: 'Main',
        category: 'Drink',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '270 gm',
        isAvailable: true,
        sku: 'yes'
      },
      {
        id: 2,
        name: 'Bakery',
        description: 'The Ultimate Pattie and Bun Treat.',
        imageId: 'assets/images/bakery.png',
        price: 190,
          shortDescription: 'Good for health',
        prodType: 'Adon',
        category: 'Desert',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '200 gm',
        isAvailable: true,
        sku: 'yes'
      },
      {
        id: 3,
        name: 'Nuggets',
        description: ' Crispy crust, is a must!!',
        imageId: 'assets/images/bakery.png',
        price: 201,
          shortDescription: 'Good for health',
        prodType: 'Main',
        category: 'Desert',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '140 gm',
        isAvailable: true,
        sku: 'yes'
      },
      {
        id: 4,
        name: 'Soup',
        description: 'Taste Your Favourite Desire',
        imageId: 'assets/images/soup.png',
        price: 300,
          shortDescription: 'Good for health',
        prodType: 'Adon',
        category: 'Snacks',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '250 gm',
        isAvailable: true,
        sku: 'yes'
      },
      {
        id: 5,
        name: 'Daal',
        description: 'Eat Healthy, Live Healthy',
        imageId: 'assets/images/daal.png',
        price: 40,
          shortDescription: 'Good for health',
        prodType: 'Main',
        category: 'Drink',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '100 gm',
        isAvailable: true,
        sku: 'yes'
      },
      {
        id: 6,
        name: 'Mix Sabzi',
        description: 'Eat Healthy, Live Healthy',
        imageId: 'assets/images/mix-sabzi.png',
        price: 200,
          shortDescription: 'Good for health',
        prodType: 'Adon',
        category: 'Desert',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '300 gm',
        isAvailable: true,
        sku: 'yes'
      },
      {
        id: 7,
        name: 'Donald trump',
        description: 'Fat and racist',
        imageId: 'assets/images/donald.jpg',
        price: 200,
          shortDescription: 'Good for health',
        prodType: 'Main',
        category: 'Snacks',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '110 kg',
        isAvailable: true,
        sku: 'yes'
      },

    ];
    let plans = [
      {
        id: 1,
        planCategoryId: 1,
        planType: 'BreakFast',
        perMealPrice: '1300',
        name: 'Cold Breakfast',
        description: 'Description about plan type',
        isPublished: false,

        planProducts: [
          {
            id: 0,
            planId: 0,
            productId: 1,
            servingDate: "2022-01-27",
            isPublished: false
          },
        ]
      },
      {
        id: 2,
        planCategoryId: 3,
        planType: 'BreakFast',
        perMealPrice: '1300',
        name: 'Cold Breakfast',
        description: 'Description about plan type',
        isPublished: false,

        planProducts: [
          {
            id: 0,
            planId: 1,
            productId: 1,
            servingDate: "2022-01-27",
            isPublished: false
          },
        ]
      },
      {
        id: 1,
        planCategoryId: 2,
        planType: 'BreakFast',
        perMealPrice: '1300',
        name: 'Cold Breakfast',
        description: 'Description about plan type',
        isPublished: false,

        planProducts: [
          {
            id: 0,
            planId: 2,
            productId: 1,
            servingDate: "2022-01-27",
            isPublished: false
          },
        ]
      },

    ];
    let users = [
      {
        id: 1,
        firstName: 'Salman',
        lastName: 'Abdul Aziz',
        email: 'salman123@gmail.com',
        mobileNumber: '+923214568259',
        isActive: true,
        userType: 'Customer',
        profileImgUrl: 'assets/images/salman.jpg',
      },
      {
        id: 2,
        firstName: 'Khabib',
        lastName: 'Nurmagomedove',
        email: 'khabib123@gmail.com',
        mobileNumber: '+923001259862',
        isActive: true,
        userType: 'Delivery Boy',
        profileImgUrl: 'assets/images/khabib.jpg',
      },
      {
        id: 3,
        firstName: 'Donald',
        lastName: 'Trump',
        email: 'donald123@gmail.com',
        mobileNumber: '+923001259862',
        isActive: true,
        userType: 'Admin',
        profileImgUrl: 'assets/images/donald.jpg',
      },
      {
        id: 4,
        firstName: 'Cartoon',
        lastName: 'Jerry',
        email: 'jerry123@gmail.com',
        mobileNumber: '+923001259862',
        isActive: true,
        userType: 'Customer',
        profileImgUrl: 'assets/images/logo.png',
      },

    ];
    return { products, users, plans }
  }
}
