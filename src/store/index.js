import axios from "axios";
import Vue from "vue";
import Vuex from 'vuex'

Vue.use( Vuex )

export default new Vuex.Store( {
  state: {
    cartProducts: [],
    actualAccessKey: null,
    categories: []
  },
  mutations: {
    updateCartProducts ( state, products )
    {
      state.cartProducts = products
    },
    updateActualAccessKey ( state, key )
    {
      state.actualAccessKey = key
    },
    updateCategories ( state, categories )
    {
      state.categories = categories
    }
  },
  actions: {
    //загружаем корзину пользователя. По условиям АПИ: если не передать уникальный ключ пользователя, то будет сгенерирован новый и для него будет создана новая корзина. Ключ будет возвращен в ответе
    loadCart ( context )
    {
      return axios
        .get( 'https://vue-study.skillbox.cc/api/baskets', {
          params: {
            userAccessKey: context.state.actualAccessKey
          }
        } )
        .then( res =>
        {
          // если ключа не было, то он генерируется и запоминается в локальное хранилище
          if ( !context.state.actualAccessKey )
          {
            localStorage.setItem( 'accessKey', res.data.user.accessKey )
            context.commit( 'updateActualAccessKey', res.data.user.accessKey )
          }
          context.commit( 'updateCartProducts', res.data.items )
        } )
    },
    // загружаем категории товаров
    loadCategories ( context )
    {
      return axios
        .get( "https://vue-study.skillbox.cc/api/productCategories" )
        .then( ( res ) =>
        {
          context.commit( 'updateCategories', res.data.items )
        } );
    },
    //добавление товара в корзину
    // addToCart ( context )
    // {
    //   axios.post( 'https://vue-study.skillbox.cc/api/baskets/', {
    //     params: {
    //       userAccessKey: context.state.actualAccessKey
    //     }
    //   } )
    // }
  },
  getters: {
    // преобразуем cartProducts в готовый массив с товарами в корзине для вывода
    getProducts ( state )
    {
      return state.cartProducts.map( ( elem ) =>
      {
        return {
          title: elem.product.title,
          price: elem.price,
          image: elem.product.image.file.url,
          amount: elem.quantity,
          id: elem.product.id
        };
      } );
    },
    //преобразуем categories в готовый массив, где есть только название категории и её id
    getCategories ( state )
    {
      return state.categories.map( elem =>
      {
        return {
          title: elem.title,
          id: elem.id
        }
      } )
    },
    // считаем количество товаров в корзине
    productsInCart ( state )
    {
      return state.cartProducts.length
    },
    // считаем общую сумму товаров в корзине
    cartTotal ( state )
    {
      let summ = 0
      state.cartProducts.forEach( elem =>
      {
        summ += elem.price * elem.quantity
      } )
      return summ
    }
  }
} )
