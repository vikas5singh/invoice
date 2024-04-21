const htmlToPdf = require('html-pdf');
const fs = require('fs');

const pdfService = (data, callback) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          line-height: 1.6;
        }
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #333;
          text-align: center;
        }
        p {
          font-size: 16px;
          margin-bottom: 10px;
          color: #666;
        }
        .invoice-details {
          margin-bottom: 20px;
          border-bottom: 1px solid #ccc;
          padding-bottom: 20px;
        }
        .invoice-details p {
          margin: 0;
        }
        .invoice-details strong {
          font-weight: bold;
          margin-right: 10px;
        }
        .status {
          font-weight: bold;
          color: green;
        }
        @media only screen and (max-width: 600px) {
          h1 {
            font-size: 20px;
          }
          p {
            font-size: 14px;
          }
        }
      </style>
    </head>
    <body>
      <h1>Invoice</h1>
      <div class="invoice-details">
        <p><strong>Username:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Invoice Number:</strong> ${data.invoiceNumber}</p>
        <p><strong>Invoice Name:</strong> ${data.invoiceName}</p>
      </div>
      <div class="invoice-amount">
        <p><strong>Amount:</strong> $${data.amount}</p>
        <p><strong>Tax:</strong> $${data.tax}</p>
        <p><strong>Status:</strong> <span class="status">${data.status}</span></p>
      </div>
    </body>
    </html>
  `;
  const options = { format: 'Letter' };
  htmlToPdf.create(html, options).toBuffer(callback);
}



module.exports = pdfService