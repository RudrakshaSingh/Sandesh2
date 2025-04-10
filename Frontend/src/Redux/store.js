import {configureStore} from '@reduxjs/toolkit'

import UserAuth from './Slices/UserAuth';

const store  = configureStore({
    reducer : {
        userAuth : UserAuth,



    },
    devTools : true

});

export default store;
