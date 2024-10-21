import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


// {
//   "companyInfo": {
//     "esbn": "3456654678",
//     "email": "admin@test.com",
//     "phone": "09085859594",
//     "sector": "market",
//     "address": "35 abba street",
//     "discountAmount": "700",
//     "discountDesc": "test purpose",
//     "outstandingAmount": "600",
//     "outstandingDesc": "test",
//     "fileType": "Unit Filling"
//   },
//   "categories": [
//     {
//       "Product": "test",
//       "Bill_Amount": 800,
//       "Start_Date": "2024-10-20",
//       "End_Date": "2024-10-26",
//       "Vat_Amount": 60,
//       "Status": "",
//       "Pt_Rate": 7.5,
//       "Category": ""
//     },
//     {
//       "Product": "",
//       "Bill_Amount": 0,
//       "Start_Date": "",
//       "End_Date": "",
//       "Vat_Amount": 0,
//       "Status": "",
//       "Pt_Rate": 7.5,
//       "Category": ""
//     }
//   ]
// }