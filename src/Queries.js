const httpAuth = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + getToken(),
  },
});

const http = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-type": "application/json" },
});

const getShipments = () => {
  const res = httpAuth
    .get("/shipments")
    .then((res) => {
      setShipmentState({
        shipmentsData: res.data.shipments,
        loading: false,
      });
    })
    .catch(function (error) {
      if (error.response.status == 401) {
        logout();
      }
    });
};

const saveShipment = async (e) => {
  e.preventDefault();
  let bodyJson = {
    waybill: waybill,
    customer_address: customerAddress,
    customer_name: customerName,
    phone_number: phoneNumber,
  };
  httpAuth
    .post("/shipments", bodyJson)
    .then((res) => {
      navigate(-1);
    })
    .catch(function (error) {
      console.log(error.response.status); // 401
      console.log(error.response.data.error); //Please Authenticate or whatever returned from server
      if (error.response.status == 401) {
        logout();
      }
    });
};

const updateShipment = (e) => {
  e.preventDefault();
  let bodyJson = {
    waybill: waybill,
    customer_address: customerAddress,
    customer_name: customerName,
    phone_number: phoneNumber,
  };
  httpAuth
    .put("/shipments/" + id, bodyJson)
    .then((res) => {
      navigate(-1);
    })
    .catch(function (error) {
      console.log(error.response.status); // 401
      console.log(error.response.data.error); //Please Authenticate or whatever returned from server
      if (error.response.status == 401) {
        logout();
      }
    });
};

function login(e) {
  e.preventDefault();
  http.post("/login", { email: email, password: password }).then((res) => {
    setToken(res.data.user, res.data.access_token);
    navigate("/shipments");
  });
}

function register(e) {
  e.preventDefault();
  http
    .post("/register", { name: name, email: email, password: password })
    .then(() => {
      navigate("/login");
    });
}
