export default function ChangeCurrency({ currentCurrency, setCurrency }) {
  // implement an API for real-time conversion rates

  // const rates = {
  //     CAD: 1,
  //     USD: 0.75,
  //     EUR: 0.65,
  // };

  // function convertPrice(price) {
  //     return (price * rates[currency]).toFixed(2);
  // };

  const currencies = [
    { code: "CAD", label: "CAD" },
    { code: "USD", label: "USD" },
    { code: "EUR", label: "EUR" },
  ];

  return (
    <div className="ml-8">
      <label htmlFor="currency" className="sr-only">
        Select Currency
      </label>
      <select
        id="currency"
        name="currency"
        value={currentCurrency}
        onChange={(e) => setCurrency(e.target.value)}
        className="bg-white text-sm font-sm text-gray-700 hover:text-gray-800"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.label}
          </option>
        ))}
      </select>
    </div>
  );
}
