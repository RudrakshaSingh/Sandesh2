import {configureStore} from '@reduxjs/toolkit'

import UserAuth from './Slices/UserAuth';
import ContactAuth from './Slices/ContactAuth';

const store  = configureStore({
    reducer : {
        userAuth : UserAuth,
        contactAuth : ContactAuth





    },
    devTools : true

});

export default store;
