// Mock model used in transaction table, should be deleted later on once connected to API
function createData(
  date,
  category,
  account,
  partner,
  reference,
  amount,
  verified
) {
  return {
    date,
    category,
    account,
    partner,
    reference,
    amount,
    verified,
  };
}
const rows = [
  createData(
    '30.05.2022',
    'Restaurant',
    'Sparkasse Giro',
    'McDonalds',
    'cheeseburger Hbf',
    3.99,
    'true'
  ),
  createData(
    '29.05.2022',
    'Restaurant',
    'Sparkasse Giro',
    'McDonalds',
    'cheeseburger Hbf',
    3.99,
    'true'
  ),
  createData(
    '27.05.2022',
    'Restaurant',
    'Sparkasse Giro',
    'McDonalds',
    'cheeseburger Hbf',
    3.99,
    'true'
  ),
  createData(
    '25.05.2022',
    'Restaurant',
    'Sparkasse Giro',
    'McDonalds',
    'cheeseburger Hbf',
    3.99,
    'true'
  ),
  createData(
    '21.05.2022',
    'Restaurant',
    'Sparkasse Giro',
    'McDonalds',
    'cheeseburger Hbf',
    13.99,
    'true'
  ),
  createData(
    '18.05.2022',
    'Restaurant',
    'Sparkasse Giro',
    'McDonalds',
    'cheeseburger Hbf',
    93.99,
    'true'
  ),
  createData(
    '12.05.2022',
    'Restaurant',
    'Sparkasse Giro',
    'McDonalds',
    'cheeseburger Hbf',
    3.99,
    'true'
  ),
  createData(
    '09.05.2022',
    'Restaurant',
    'Sparkasse Giro',
    'McDonalds',
    'cheeseburger Hbf',
    4.99,
    'true'
  ),
];

export default rows;
