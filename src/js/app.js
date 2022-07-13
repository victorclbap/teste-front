$(document).ready(function () {
  $("#name").siblings("p").show();
  $("#submit").click(function (e) {
    e.preventDefault();

    // Checking empty fields

    $("input").each(function () {
      if ($(this).val() == "") {
        $(this).siblings("p").html("Por gentileza, preencha este campo");
      }
    });

    showErrorEmail();

    ShowErrorCPF();

    showErrorPassword();

    successMessage();
  });

  // Cancel button click event
  $("#cancel").click(function (e) {
    e.preventDefault();
    $("#form")[0].reset();
    $(".submit-success-message").hide();
    $("input").siblings("p").empty();
  });

  // Email validation

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const showErrorEmail = () => {
    const $result = $("#result");
    const email = $("#email").val();
    $result.text("");

    if (!validateEmail(email)) {
      $result.text(" E-mail inválido" + " " + email);
    }
    return false;
  };

  // Date of birth validation

  const dateOfBirth = $("#date");

  dateOfBirth.focusout(function (e) {
    $(this).siblings("p").html(validateDateOfBirth(e.target));
  });

  function validateDateOfBirth(input) {
    const receivedDate = new Date(input.value);

    if (!isOverEighteen(receivedDate)) {
      let message = "Você deve ser maior que 18 anos para se cadastrar";
      return message;
    }
  }

  function isOverEighteen(date) {
    const currentDate = new Date();
    const overEighteenDate = new Date(
      date.getUTCFullYear() + 18,
      date.getUTCMonth(),
      date.getUTCDate()
    );

    return overEighteenDate <= currentDate;
  }
});

// Password validation

function validatePassword(password, passwordConfirmation) {
  if (password === passwordConfirmation) {
    return true;
  } else {
    return false;
  }
}

function showErrorPassword() {
  if (
    !validatePassword($("#password").val(), $("#password-confirmation").val())
  ) {
    $("#password").siblings("p").html("As senhas devem ser iguais");
    $("#password-confirmation")
      .siblings("p")
      .html("As senhas devem ser iguais");
  }
}

// CPF validation
$("#cpf").mask("000.000.000-00");

function ShowErrorCPF() {
  if (!validateCPF($("#cpf").val())) {
    $("#cpf").siblings("p").html("CPF Inválido");
  }
}

function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf == "") return false;

  // strip known invalid CPFs

  if (
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  )
    return false;

  // validate the first digit

  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) return false;

  // validate the second digit

  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return false;
  return true;
}

// Success message setup

$(".submit-success-message").hide();

function successMessage() {
  let name = $("#name").siblings("p").html();
  let cpf = $("#cpf").siblings("p").html();
  let email = $("#email").siblings("p").html();
  let date = $("#date").siblings("p").html();
  let password = $("#password").siblings("p").html();
  let passwordConfirmation = $("#password-confirmation").siblings("p").html();

  if (
    name == "" &&
    cpf == "" &&
    email == "" &&
    date == "" &&
    password == "" &&
    passwordConfirmation == ""
  ) {
    $(".submit-success-message").show();
  }
}
