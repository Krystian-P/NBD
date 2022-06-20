// 6. Dodaj siebie do bazy, zgodnie z formatem danych użytych dla innych osób (dane dotyczące karty kredytowej, adresu zamieszkania i wagi mogą być fikcyjne)
db.people.insert({
  sex: 'Male',
  first_name: 'Krystian',
  last_name: 'Bezplako',
  job: 'Student',
  email: 'krystianbezpalko@gmail.com',
  location: {
    city: 'Warsaw',
    address: { streetname: 'Rakxxxx', streetnumber: '0-' }
  },
  description: "F1 fan",
  height: 180,
  weight: 79,
  birth_date: '1997-11-20T07:00:00Z',
  nationality: 'Poland',
  credit: [
    {
      type: 'mastercard',
      number: '-------',
      currency: 'PLN',
      balance: '1'
    }
  ]
});
