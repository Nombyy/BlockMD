App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  isReceived: false,
  SelectedPrescID : 0,
  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Doctor.json", function(doctor) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Doctor = TruffleContract(doctor);
      // Connect provider to interact with contract
      App.contracts.Doctor.setProvider(App.web3Provider);
      return App.render();
    });
  },

  render: function() {
    var instance;
    var loader = $("#loader");
    var content = $("#content");

    //loader.show();
    //content.hide();

    // Load account data from Ganache
    /* web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Pharmacist Account: " + account);
      }
    }); */
    ethereum.enable();
    App.account = web3.eth.accounts[0];
    // Talk to Metamask from browser
    $("#accountAddress").html("Pharmacist Account: " + App.account);

    // Load contract data
/*   App.contracts.Doctor.deployed().then(function(i) {
  instance = i;
  // $("#healthCard").html("123456789");
  var healthC = $("#healthCard").val();
  
  instance.patients(healthC).then(function(patient){ 
    var presID = patient[4];
    console.log(presID + " is the curr prescription id");
    
    return presID;    
  }).then(function(presID) {
      instance.prescriptions(presID).then(function(prescription){
        var id = prescription[0];
        var healthCardNumber = prescription[1];
        var drugName = prescription[2];
        var frequency = prescription[3];
        var dosage = prescription[4]; 
        var patientReceived = prescription[5];

        // Render prescription Result
        var prescriptionTemplate = "<tr><th>" + drugName + "</th><td>" + frequency + "</td><td>" + dosage + "</td></tr>"
        //prescriptionResult.append(prescriptionTemplate);
        var drugN = $("#drugName").html(drugName);

      })
  })
}).catch(function(err) {
  console.error(err);
}); */

  },
    
  bindEvents: function() {
    $(document).on('click', '#btn-received', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  },

  GetPatientInfo: function()
  {
    App.contracts.Doctor.deployed().then(function(i) {
      instance = i;
      // $("#healthCard").html("123456789");
      var healthC = $("#healthCard").val();

      instance.patients(healthC).then(function(patient){ 
        var presID = patient[4];
        //console.log(presID + " is the curr prescription id");
        
        return presID;    
      }).then(function(presID) {
          instance.prescriptions(presID).then(function(prescription){
            SelectedPrescID = prescription[0];
            var healthCardNumber = prescription[1];
            var drugName = prescription[2];
            var frequency = prescription[3];
            var dosage = prescription[4]; 
            var patientReceived = prescription[5];

            $("#selectpresc").val(SelectedPrescID);

            // Render prescription Result
            var prescriptionTemplate = "<tr><th>" + drugName + "</th><td>" + frequency + "</td><td>" + dosage + "</td></tr>"
            var prescriptionResult = $("#prescriptionResult");
            prescriptionResult.html(prescriptionTemplate);

            $("#tblPresc").show();
            $("#updatePrescription").show();
    
          })
      })
    }).catch(function(err) {
      console.error(err);
    });
  },

  UpdatePrescriptionInfo: function()
  {
    App.contracts.Doctor.deployed().then(function(i) {
      instance = i;
      console.log("prescID" + SelectedPrescID);
      instance.fulfill(SelectedPrescID).then(function(j) {
        instance.prescriptions(SelectedPrescID).then(function(prescription){
          var healthCard = prescription[1];
          var patientReceived = prescription[5];

          instance.patients(healthCard).then(function(patient){
          }).catch(function(err) {
            console.error(err);
          });
        });
      }) 
    });
  }

};




$(function() {
  $(window).load(function() {
    App.init();

    $("#tblPresc").hide();
    $("#updatePrescription").hide();
  });
});
