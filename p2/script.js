const users = [];
let user={}
const showLogin = () => {
  let str = `
    <div>
    <h1>Login Form</h1>
    <p><div id="dvMsg"></div></p>
    <p><input type="text" id="txtEmail"></p>
    <p><input type="password" id="txtPass"></p>
    <p><button onclick='validateUser()'>Log In</button></p>
    <p><button onclick='showRegister()'>Create Account</button></p>
    </div>
    `;
  root.innerHTML = str;
};

const showRegister = () => {
  let str = `
    <h1>Register Form</h1>
    <p><input type="text" id="txtName"></p>
     <p><input type="text" id="txtEmail"></p>
    <p><input type="password" id="txtPass"></p>
    <button onclick='addUser()'>Register</button>
    <hr>
    <button onClick='showLogin()'>Alread a Member? Login here...</button>
    `;
  root.innerHTML = str;
};

const showHome = () => {
  let userOptions = users
    .filter((u) => u.email !== user.email)
    .map((u) => `<option value="${u.email}">${u.name}</option>`)
    .join("");

  let str = `
    <h1>Welcome ${user.name}</h1>
    <hr>
    <p>
      <select id="actionSelect">
        <option value=0>--select--</option>
        <option value=1>Deposit</option>
        <option value=2>Withdraw</option>
      </select>
    </p>
    <p><input type='number' id='txtAmount'></p>
    <p>
      <button onclick='submitb()'>Submit</button>
      <button onclick='showLogin()'>Logout</button>
    </p>
    <hr>
    <h3>Transfer Funds</h3>
    <p>
      <select id="transferUser">
        <option value="">--Select User--</option>
        ${userOptions}
      </select>
    </p>
    <p><input type='number' id='transferAmount' placeholder='Amount to transfer'></p>
    <p><button onclick='fundtransfer()'>Gibmonay</button></p>
    <hr>
    <p>Current balance: ${user.balance}</p>
  `;
  root.innerHTML = str;
};


const addUser = () => {
  const obj = {
    name: document.getElementById("txtName").value,
    email: document.getElementById("txtEmail").value,
    pass: document.getElementById("txtPass").value,
    balance:0
  };
  users.push(obj);
  showLogin();
};

const validateUser = () => {
  let email = document.getElementById("txtEmail").value;
  let pass = document.getElementById("txtPass").value;
   user = users.find(
    (e) => e.email === email && e.pass === pass
  )
  if (user) {
    showHome();
  } else {
    dvMsg.innerHTML = "Access Denied";
  }
};
const submitb = () => {
  let amount = document.getElementById("txtAmount").value;
  let select = document.querySelector("select").value;
  if (select == 1) {
    user.balance += parseInt(amount);
  } else if (select == 2) {
    user.balance -= parseInt(amount);
  }
   if(user.balance < 0) {
    alert("Insufficient balance");
    return deposit.value();
  }
  showHome();
}

const fundtransfer = () => {
  let receiverEmail = document.getElementById("transferUser").value;
  let amount = parseInt(document.getElementById("transferAmount").value);

  if (!receiverEmail || isNaN(amount)) {
    alert("Enter valid user and amount");
    return;
  }

  if (user.balance < amount) {
    alert("Insufficient balance");
    return;
  }

  let receiver = users.find((u) => u.email === receiverEmail);
  if (!receiver) {
    alert("User not found");
    return;
  }

  user.balance -= amount;
  receiver.balance += amount;
  alert(`Transferred ₹${amount} to ${receiver.name}`);
  showHome();
};

