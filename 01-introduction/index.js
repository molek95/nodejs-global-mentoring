function getRandomNumber() {
  return Math.floor(Math.random() * 1000) + 1;
}

console.log({ randomNumber: getRandomNumber() });

export default getRandomNumber;
