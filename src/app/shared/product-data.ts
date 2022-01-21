import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Plans } from '../dashboard/plans/models/plans-model';
import { Products } from '../dashboard/products/models/products';
import { Users } from '../dashboard/users/models/users-model';
export class ProductData implements InMemoryDbService {
  createDb() {
    let products: Products[] = [
      {
        id: 1,
        name: 'Burger',
        description: 'So Sweet. So Good. Sure to bring smiles.',
        image: 'assets/images/burgers.png',
        price: 210,
        shortDesc: 'Good for health',
        productType: 'Main',
        category: 'Drink',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '270 gm'
      },
      {
        id: 2,
        name: 'Bakery',
        description: 'The Ultimate Pattie and Bun Treat.',
        image: 'assets/images/bakery.png',
        price: 190,
        shortDesc: 'Good for health',
        productType: 'Adon',
        category: 'Desert',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '200 gm',

      },
      {
        id: 3,
        name: 'Nuggets',
        description: ' Crispy crust, is a must!!',
        image: 'assets/images/bakery.png',
        price: 201,
        shortDesc: 'Good for health',
        productType: 'Main',
        category: 'Desert',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '140 gm'

      },
      {
        id: 4,
        name: 'Soup',
        description: 'Taste Your Favourite Desire',
        image: 'assets/images/soup.png',
        price: 300,
        shortDesc: 'Good for health',
        productType: 'Adon',
        category: 'Snacks',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '250 gm'

      },
      {
        id: 5,
        name: 'Daal',
        description: 'Eat Healthy, Live Healthy',
        image: 'assets/images/daal.png',
        price: 40,
        shortDesc: 'Good for health',
        productType: 'Main',
        category: 'Drink',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '100 gm'

      },
      {
        id: 6,
        name: 'Mix Sabzi',
        description: 'Eat Healthy, Live Healthy',
        image: 'assets/images/mix-sabzi.png',
        price: 200,
        shortDesc: 'Good for health',
        productType: 'Adon',
        category: 'Desert',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '300 gm'

      },
      {
        id: 7,
        name: 'Donald trump',
        description: 'Fat and racist',
        image: 'assets/images/donald.jpg',
        price: 200,
        shortDesc: 'Good for health',
        productType: 'Main',
        category: 'Snacks',
        ingrediants: ['Sodium', 'Potassium', 'Calsium'],
        allergyInfo: 'Please provide Alergy Info',
        calories: 310,
        weight: '110 kg'

      },

    ];
    let plans: Plans[] = [
      {
        id: 1,
        planCategory: 'Executive',
        planType: 'BreakFast',
        weekly_price: '1300',
        monthly_price: '1500',
        image: 'assets/images/burgers.png',
        action: '',
        date: '2021-10-15',
        meals: [
          { meal1: 'Daal', meal2: 'Chawal', meal3: 'Samosa' },
        ]
      },
      {
        id: 2,
        planCategory: 'Executive',
        planType: 'Lunch',
        weekly_price: '900',
        monthly_price: '2100',
        image: 'assets/images/soup.png',
        action: '',
        date: '2021-10-11',
        meals: [
          { meal1: 'Biryani', meal2: 'Nehari', meal3: 'Samosa' },
        ]
      },
      {
        id: 3,
        planCategory: 'Executive',
        planType: 'Dinner',
        weekly_price: '470',
        monthly_price: '4700',
        image: 'assets/images/bakery.png',
        action: '',
        date: '2021-10-12',
        meals: [
          { meal1: 'Pulao', meal2: 'Chawal', meal3: 'Chicken' },
        ]
      },
      {
        id: 4,
        planCategory: 'Low Cal',
        planType: 'BreakFast',
        weekly_price: '570',
        monthly_price: '3570',
        image: 'assets/images/bakery.png',
        action: '',
        date: '2021-10-13',
        meals: [
          { meal1: 'Naan', meal2: 'Daleem', meal3: 'Pakora' },
        ]
      },
      {
        id: 5,
        planCategory: 'Low Cal',
        planType: 'Lunch',
        weekly_price: '1350',
        monthly_price: '3150',
        image: 'assets/images/bakery.png',
        action: '',
        date: '2021-10-14',
        meals: [
          { meal1: 'Savzi', meal2: 'Pakora', meal3: 'Samosa' },
        ]
      },
      {
        id: 6,
        planCategory: 'Low Cal',
        planType: 'Dinner',
        weekly_price: '400',
        monthly_price: '900',
        image: 'assets/images/bakery.png',
        action: '',
        date: '2021-10-15',
        meals: [
          { meal1: 'Gosht', meal2: 'Zarda', meal3: 'Samosa' },
        ]
      },
      {
        id: 7,
        planCategory: 'Economy',
        planType: 'BreakFast',
        weekly_price: '120',
        monthly_price: '1220',
        image: 'assets/images/bakery.png',
        action: '',
        date: '2021-10-16',
        meals: [
          { meal1: 'Pulao', meal2: 'Steak', meal3: 'Samosa' },
        ]
      },
      {
        id: 8,
        planCategory: 'Economy',
        planType: 'Lunch',
        weekly_price: '750',
        monthly_price: '2550',
        image: 'assets/images/bakery.png',
        action: '',
        date: '2021-10-17',
        meals: [
          { meal1: 'Naan', meal2: 'Chawal', meal3: 'Mutanjan' },
        ]
      },
      {
        id: 9,
        planCategory: 'Economy',
        planType: 'Dinner',
        weekly_price: '250',
        monthly_price: '1750',
        image: 'assets/images/bakery.png',
        action: '',
        date: '2021-10-18',
        meals: [{
          meal1: 'Shawarma',
          meal2: 'Burger',
          meal3: 'Samosa'
        }]
      },
    ];
    let users: Users[] = [
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
