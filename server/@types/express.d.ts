// import { Request } from 'express'

// // declare namespace Express {
// //    export interface userinfo extends Request {
// //         userinfo?: {
// //             id: string;
// //             email: string;
// //         }
// //     }
// // }



// declare global {
//     namespace Express {
//         interface Request {
//             userinfo?: {
//                 id: string;
//                 email: string;
//             }
//         }
//     }
// }

import { Request } from 'express'

declare module 'express-serve-static-core' {
    interface Request {
        userinfo?: {
            id: number;
            email: string;
        }
    }
}