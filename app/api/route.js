import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from '../lib/definitions';
import { formatCurrency } from '../lib/utils';


export async function GET() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.DATA_API_KEY,
      },
    })
    const data = await res.json()
   
    return Response.json({ data })
  }

  export async function customers() {
    try {
      const data = await sql<CustomerField>`
        SELECT
          id,
          name
        FROM customers
        ORDER BY name ASC
      `;
  
      const customers = data.rows;
      return Response.json({ customers })
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all customers.');
    }
  }