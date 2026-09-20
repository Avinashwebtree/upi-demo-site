const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'transactions.json');
const ADMIN_KEY = process.env.ADMIN_KEY || 'changeme';

app.use(express.json());
app.use(express.static(__dirname));

function readTransactions() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeTransactions(list) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

app.post('/api/transactions', (req, res) => {
  const { amount, note } = req.body;
  const amountNum = parseFloat(amount);
  if (!amountNum || amountNum <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  const entry = {
    id: crypto.randomUUID(),
    amount: amountNum,
    note: (note || '').slice(0, 200),
    createdAt: new Date().toISOString(),
    status: 'reported', // self-reported by the payer's browser, not verified against any bank/UPI record
  };
  const list = readTransactions();
  list.unshift(entry);
  writeTransactions(list);
  res.json(entry);
});

app.get('/api/transactions', (req, res) => {
  if (req.query.key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json(readTransactions());
});

app.listen(PORT, () => {
  console.log(`UPI demo backend running on http://localhost:${PORT}`);
});
