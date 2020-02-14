#!groovy

import groovy.json.JsonSlurperClassic
node {

    def BUILD_NUMBER = env.BUILD_NUMBER
    def RUN_ARTIFACT_DIR = "tests/${BUILD_NUMBER}"
    
    def HUB_ORG = "${params.USER_NAME}"
    def SFDC_HOST = "${params.INSTANCE}"
    def JWT_KEY_CRED_ID = "${params.OPENSSL_KEY}"
    def CONNECTED_APP_CONSUMER_KEY = "${params.CONSUMER_KEY}"

    println 'KEY IS'
    println ('JWT_KEY_CRED_ID --' +JWT_KEY_CRED_ID)
    println ('HUB_ORG --' +HUB_ORG)
    println ('SFDC_HOST --' +SFDC_HOST)
    println ('CONNECTED_APP_CONSUMER_KEY --' +CONNECTED_APP_CONSUMER_KEY)
    
    def toolbelt = tool 'toolbelt'
    def deploymentStatusCmd = ""
    

    stage('checkout source code ') {
        checkout scm
    }

    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
        stage('Authorize ORG') {
            if (isUnix()) {
                rc = sh returnStatus: true, script: "${toolbelt}/sfdx force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwtkeyfile ${jwt_key_file} -d --instanceurl ${SFDC_HOST}"
            } else {
                rc = bat returnStatus: true, script: "${toolbelt}/sfdx force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwtkeyfile \"${jwt_key_file}\" -d --instanceurl ${SFDC_HOST}"
            }
            
            if (rc != 0) {
                error 'hub org authorization failed'
            }

            println(rc)
        }
        stage('Convert Salesforce DX and Store in SRC Folder') {
            if (isUnix()) {
                println(' Convert SFDC Project to normal project')
                srccode = sh returnStdout: true, script : "${toolbelt}/sfdx force:source:convert -r force-app -d ./src"
            } else {
                println(' Convert SFDC Project to normal project')
                srccode = bat returnStdout: true, script : "${toolbelt}/sfdx force:source:convert -r force-app -d ./src"
            }
            println(srccode)
        }
        stage('Push To Target Org') {
            if(isUnix()){
                println(' Deploy the code into Scratch ORG.')
                sourcepush = sh returnStdout: true, script : "${toolbelt}/sfdx force:mdapi:deploy -d ./src -u ${HUB_ORG}"
            }else{
                println(' Deploy the code into Scratch ORG.')
                sourcepush = bat returnStdout: true, script : "${toolbelt}/sfdx force:mdapi:deploy -d ./src -u ${HUB_ORG}"
            }            
            
            Boolean isDeployProcessDone = false;
            String deploySuccessful = '"status": "Succeeded"';
            String deployUnsuccessful = '"success": false';
            
            while(!isDeployProcessDone){
                if (deploymentStatus.contains(deploySuccessful)){
                    println('Deployment Succeeded');
                    isDeployProcessDone = true;
                } else if (deployUnsuccessful.contains(deployUnsuccessful)){
                    println('Deployment Did Not Succeed');
                    println(deploymentStatus);
                    isDeployProcessDone = true;
                } else {
                    println('Deployment In Progress');
                    println(deploymentStatus);
                    sleep 5;
                    if (isUnix()){
                        deploymentStatus = sh returnStdout: true, script: "${toolbelt}/sfdx force:mdapi:deploy:report -u ${HUB_ORG} --json"
                    } else {
                        deploymentStatus = bat returnStdout: true, script: "${toolbelt}/sfdx force:mdapi:deploy:report -u ${HUB_ORG} --json"
                    }
                }
            }            
        }
    }
}
