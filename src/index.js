import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2a', (req, res) => {
  const sum = (+req.query.a || 0) + (+req.query.b || 0);
  res.send(sum.toString());
});
app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

app.get('/task2b', (req, res) => {
  console.log(req.query.fullname);
  if (req.query.fullname === '') {
    res.send('Invalid fullname');
  }

  const result = req.query.fullname.replace(/\s+/g, ' ').trim().split(' ');

  for (const index in result) {
    if (result[index].search('[0-9_/]') !== -1) {
      res.send('Invalid fullname');
    }
    result[index] = result[index][0].toUpperCase() + result[index].slice(1).toLowerCase();
    // console.log(result[index][0].toUpperCase());
    // console.log(result[index].slice(1).toLowerCase());
    console.log(result);
  }

  if (result.length === 3) {
    const name = result[0][0];
    const patronymic = result[1][0];
    const sourname = result[2];
    res.send(`${sourname} ${name}. ${patronymic}.`);
  } else if (result.length === 2) {
    const name = result[0][0];
    const sourname = result[1];
    res.send(`${sourname} ${name}.`);
  } else if (result.length === 1) {
    const sourname = result[0];
    res.send(`${sourname}`);
  } else {
    res.send('Invalid fullname');
  }
});
