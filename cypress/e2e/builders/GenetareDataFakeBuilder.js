export class GenetareDataFakeBuilder {
  generateEmail() {
    let data = Math.floor(+new Date() / 1000);
    return data + 'test@mailsac.com';
  }

  generateName() {
    const name = [
      'Miguel',
      'Arthur',
      'Gael',
      'Heitor',
      'Helena',
      'Alice',
      'Theo',
      'Laura',
      'Davi',
      'Gabriel',
      'Adriana',
      'Ana',
      'Maria',
      'Sandra',
      'Juliana',
    ];

    return name[Math.floor(Math.random() * 10)];
  }

  generateSurName() {
    const surname = [
      'Silva',
      'Santos',
      'Oliveira',
      'Oliveira',
      'Rodrigues',
      'Ferreira',
      'Alves',
      'Pereira',
      'Lima',
      'Gomes',
      'Souza',
      'Costa',
      'Ribeiro',
      'Martins',
      'Carvalho',
    ];
    return surname[Math.floor(Math.random() * 10)];
  }
}
