export const signup = data => {
  return fetch(`http://localhost:3000/api/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(r => r.json())
}

export const loginUser = data => {
  return fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(r => r.json())
}

export const autologin = userToken => {
  return fetch("http://localhost:3000/api/v1/autologin", {
    headers: {
      'Authorization': `Bearer ${userToken}`
    }
  })
  .then(r => r.json())
}

export const getProducts = () => {
  return fetch("http://localhost:3000/api/v1/products")
  .then(r => r.json())
}

export const newProduct = (formData, userToken) => {

  return fetch("http://localhost:3000/api/v1/products", {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${userToken}`
    },
    body: formData
  })
}

export const queryProducts = (type, searchTerm) => {
  return fetch(`http://localhost:3000/api/v1/products_by?type=${type}&query=${searchTerm}`)
  .then(r => r.json())
}