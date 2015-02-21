# HSF Reporter

Summary

This is a Chrome extension for the submission of samples to the HSF engine. It was built as a proof of concept in the context of te defintion of a larger project named Harms Stories Framework(HSF). This extension, as a proof of concept, works only for Gmail. Other modules or plugins may be develop after this proof of concept for other providers or as extensions, add-ons or plugins for other software.

The ojective of the extension is to lower the barrier for the submission of technically relevant information (the full email headers) of potentially malicious and/or targeted email communications, as well as to facilitate the request for further context from an analyst or researcher. The extension also aims to test the hypotesis that simple incentives,in the form of automated analysis and/or guidance, can promote the submission of samples. The project also assumes, that an increases number of samples if thought as a crowdsourced excercise, could enhance the ability of targeted populations to increase resilience as well as to access and ad-hoc early warning system. 

How does it work?

The submissions are simple and are composed of the email of the submitter as well as the full headers extracted from the original message view provided by Gmail. Both are encrypted using OpenPGP.js and then sent to a server for realy or processing (still to be discussed) using HTTP POST. No decryption keys reside on the server.

After a succesful submission, users will receive a ticket confirming the submission. Such receipt also contains a link where users can access a basic automated analysis and potentially add contextual information to the process (still to be finalized)

Preliminiary notes:

- This project is in no way affiliated with OpenPGP, Gmail or any other organizatio whose code or services are used.

- The project is part of reasearch done within the Open Technology Fund (OTF) Information Controls Fellowship Program (ICFP) and in collaboration with the University of Toronto CitzenLab. That said, the author assumes responsibility for this project.

- This project should be considered for educational or research purposes at this stage. No third party audit has been performed at this stage.