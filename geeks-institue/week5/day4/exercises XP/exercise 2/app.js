import { people } from './data.js';

function averageAge(items) {
  if (!items.length) return 0;
  const total = items.reduce((sum, person) => sum + Number(person.age || 0), 0);
  return total / items.length;
}

const avg = averageAge(people);
console.log('Average age:', avg.toFixed(2));