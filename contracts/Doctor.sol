pragma solidity ^0.5.8;

contract Doctor {
    mapping(string => Patient) public patients;
    uint public patientCount;

   mapping(address => Prescription) public prescriptions;

    struct Patient {
        string firstName;
        string lastName;
        string   healthCardNumber;
    }

    struct Prescription {
        uint     id;
        string   patientHealthCardNumber;
        string   drugName;
        string   frequency;
        string   dosage;
        bool     patientReceived;
    }

    // Constructor
    constructor () public {
        // read from json file
        // create patients
        addPatient("pavani","Machha","123456789");
    }

    function addPatient(string memory _fname, string memory _lname, string memory _healthCard) public {
        patientCount++;
        patients[_healthCard] = Patient(_fname, _lname, _healthCard);
    }

  /*  function fulfillPrescription(string _healthCard) {
        // Patient is on file
        require(!patients[msg.sender], "No patient on record!");
        require(!)

        // Get prescription

    }*/
}
