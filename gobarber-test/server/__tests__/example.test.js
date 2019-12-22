function soma(a, b) {
  return a + b;
}

test('se eu chamar a função soma com 4 e 5 ela deve retornar 9', () => {
  const resultado = soma(4, 5);

  expect(resultado).toBe(9);
});
