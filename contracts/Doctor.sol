pragma solidity ^0.5.8;

contract Doctor {
    // Store patient accounts
    mapping(uint => Patient) public patients;
    uint public patientCount;

    mapping(uint => Prescription) public prescriptions;
    uint public prescriptionCount;

    struct Patient {
        uint id;
        string firstName;
        string lastName;
        uint healthCardNumber;
        uint prescId;
    }

    struct Prescription {
        uint     id;
        uint   patientHealthCardNumber;
        string   drugName;
        string   frequency;
        string   dosage;
        bool     patientReceived;
    }

    // Constructor
    constructor () public {
        // read from json file
        // create patients
        addPatient("pavani","Machha",123456789);
        addPrescription(123456789, "Advil", "Daily", "10 ml");
    }

    function addPatient(string memory _fname, string memory _lname, uint _healthCard) public {
        patientCount++;
        patients[_healthCard] = Patient(patientCount, _fname, _lname, _healthCard, 0);
    }

    function addPrescription(uint _healthCard, string memory _drugName,string memory _frequency,string memory _dosage)public
    {
        prescriptionCount ++;
        prescriptions[prescriptionCount] = Prescription(prescriptionCount,_healthCard,_drugName,_frequency,_dosage,false);
        patients[_healthCard].prescId = prescriptionCount;
    }

    function fulfillPrescription(uint _healthCard) public {
        uint prescID = patients[_healthCard].prescId;
        uint healthCard = prescriptions[prescID].patientHealthCardNumber;
        //require(!)
        require(_healthCard != healthCard, "Invalid Patient ID");
        // Fulfill
        prescriptions[_healthCard].patientReceived = true;
    }


}
