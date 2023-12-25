row = {
  xi: "",
  Xbar: "",
  "(Xi - Xbar)": "",
  "(Xi - Xbar)2": "",
};

let Xis = [];
let Xbar = 0;
let sumOfXis = 0;
let Xi_Xbar = [];
let Xi_Xbar_square = [];
let K = []

let Xi_content = ``;
$("#addBtn").click(() => {
  Xis.push(Number($("#randomNumsInput").val()));
  console.log("Xi", Xis);

  // ------------------- sum content of Xi html
  Xi_content += `
    <span class="p-2 rounded-1 bg-white">${$("#randomNumsInput").val()}</span>
    `;

  // ------------------- add content of Xi in html
  $("#Xi").html(Xi_content);
})

$("#calculate").click(() => {
  Xbar = 0;
  sumOfXis = 0;
  Xis.forEach((Xi) => {
    sumOfXis += Xi;
  });
  // calc Xbar
  Xbar = sumOfXis / Xis.length;
  console.log("Xbar: ", Xbar);
  $("#Xbar").text("Xbar = " + Xbar);


  // calc Xi-Xbar
  let contentOfK = ``;
  Xis.forEach((Xi, i) => {
    Xi_Xbar.push(Xi - Xbar);
    if (i != Xis.length -1) {
        K.push(i+1)
        contentOfK += `
        <span class="bg-warning-subtle p-1 rounded-3">${K[i]} </span>
        ` 
    }
});

$('#K').html('K = ' + contentOfK)
  console.log("Xi_Xbar", Xi_Xbar); // -----------


  // calc (Xi-Xbar)square and get sumetion
  let sumOf_Xi_Xbar_square = 0
  Xis.forEach((Xi, i) => {
    Xi_Xbar_square.push((Xi - Xbar) * (Xi - Xbar));
    sumOf_Xi_Xbar_square += Xi_Xbar_square[i] // sumetion
  });
  let Sx = 0;
  Sx = Math.sqrt((1 / (Xi_Xbar_square.length -1)) * sumOf_Xi_Xbar_square);
  $('#Sx').text("Sx = " + Sx)
  console.log("Xi_Xbar_square", Xi_Xbar_square); // -----------
  console.log("sumOf_Xi_Xbar_square", sumOf_Xi_Xbar_square); // -----------
  console.log('Sx', Sx); // -----------
  




  // add content in table
  let contentOfTable = ``;
  Xis.forEach((Xi, i) => {
    contentOfTable += `
    <tr class="table-primary">
        <td>${Xi}</td>
        <td>${Xi_Xbar[i]}</td>
        <td>${Xi_Xbar_square[i]}</td>
    </tr>
    `;
  });
  $("tbody").html(contentOfTable);

  let sigmaXi_xbar_and_nextXi_xbar = 0;
  let rxx = [];


  for (let i = 1; i <= K.length; i++) {
    sigmaXi_xbar_and_nextXi_xbar = 0
      for (let j = 0; j < Xis.length - i; j++) {

        sigmaXi_xbar_and_nextXi_xbar += (Xis[j] - Xbar) * ( Xis[i + j] - Xbar) 

    }

    rxx.push( (1 / (Xis.length - i)) * (sigmaXi_xbar_and_nextXi_xbar / (Sx * Sx)) );

}
console.log('rxx', rxx);
    let contentOfRxxDiv = ``
    rxx.forEach((x, i) => {
        contentOfRxxDiv += `
        <div class="p-3 bg-light mt-1">
         rxx(${i+1}) = ${x}
    </div>
        `
    });

    $('#rxx').html(contentOfRxxDiv)
});
