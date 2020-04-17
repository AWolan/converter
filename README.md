# Converter
Application to convert currencies based on fixer.io API build using React 16.13.1 & Redux 4.0.5
Application should be capable of handling both free and paid one plan.

## How to install
Download node.js at least 11th and run command `npm i`

## Before build
Please set API_KEY provided from fixer.io.
It should be set in webpack.common.js line 91 - `API_KEY: JSON.stringify('<API_KEY>')`
Please change `<API_KEY>` to API key generated on fixer.io 

## How to run
To build development dist code run command `npm run build:dev`
To build production dist code run command `npm run build`
To run dev server run command `npm run watch`
To run server with dist code run command `npm run server`
To build production dist code and run it on server run command `npm start`
To run all tests run command `npm test`

## How to use
Open link http://localhost:4000/
### Latest
On 'Latest' you have possibility to convert selected currency into many others.
- Please fill 'From amount' you want to convert.
- Please select 'From' currency. EUR is set by default. To find currency you can use filter field.
- Please select 'To' currencies. If no currency is selected all currencies are taken into consideration. To find currency you can use filter field.
- Please press 'Convert' button.
- On 'To Amount(s)' you can find all converted currenies. To find currency you can use filter field.
### Historical
On 'Historical' you have possibility to check historical convertion of selected currency into many others with details about difference.
- Please fill 'From amount' you want to convert.
- Please select 'From' currency. EUR is set by default. To find currency you can use filter field.
- Please select 'To' currencies. If no currency is selected all currencies are taken into consideration. To find currency you can use filter field.
- Please fill 'From date'. Note that if from date is set to date after to date is automatically changed to to date.
- Please fill 'To date'. Note that if to date is set to date before to date is automatically changed to from date.
- Please press 'Convert' button.
- On 'To Amount(s)' you can find all converted currenies. To find currency you can use filter field.

## Notes
After retrieving data from fixer.io data are automatically updated on change of each parameter. When there is no data presented or you noticed NaN values please use 'Convert' button to retrieve new set of data.
### Tests
There are prepared some tests for actions, reducers and selectors. But due to Lack of more time not everything is tested.
