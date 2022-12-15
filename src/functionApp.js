import axios from "axios";
const link='https://sep6function.azurewebsites.net/api/HttpTrigger1?code=yeloPI47NGw-y_hjvDpHAqJ7Y-FCsQ9mOncAB8W9Jik_AzFuIsQ-Gg==';
export function sendEmailWithNewUser(email) {
    axios.post(link, {
        name: email
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
