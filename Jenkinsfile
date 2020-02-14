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
    def deploymentStatusCmd = "${toolbelt}/sfdx force:mdapi:deploy:report -u ${HUB_ORG} --json"
    def deploymentStatus = 'Queued'

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
            
            while(${deploymentStatus} == 'Queued' || ${deploymentStatus} == 'InProgress'){
                println('Checking Deployment Status');
                if(isUnix()){
                    statusDep = sh returnStdout: true, script: "${deploymentStatusCmd}"
                }else{
                    statusDep = bat returnStdout: true, script: "${deploymentStatusCmd}"
                }
            
                def statusList = statusDep.split('json')    
                def jsonSlurper = new JsonSlurperClassic()
                def robj = jsonSlurper.parseText(statusList[1])
                println('Deployment Status -- ' +robj.result.status)
                
                deploymentStatus = robj.result.status
                if(${deploymentStatus} == 'Queued' || ${deploymentStatus} == 'InProgress'){
                    sleep 60
                }
            }
            
            /*if(isUnix()){
                println('Waiting For 60 Seconds')
                sleep 60
            }else{
                println('Waiting For 60 Seconds')
                sleep 60
            }
            
            if(isUnix()){
                println('Checking Deployment Status Again ');
                statusDep1 = sh returnStdout: true, script: "${toolbelt}/sfdx force:mdapi:deploy:report -u ${HUB_ORG} --json"
            }else{
                println('Checking Deployment Status Again');
                statusDep1 = bat returnStdout: true, script: "${toolbelt}/sfdx force:mdapi:deploy:report -u ${HUB_ORG} --json"
            }
            println('Updated Deployment Status')
            println(statusDep1)*/
        }
        /*stage('Import Data to test ORG') {
            if (isUnix()) {
                println(' importing data to test org')
                dataimport = sh returnStdout: true, script: "${toolbelt}/sfdx force:data:tree:import --plan ./data/data-plan.json -u ${HUB_ORG} --json"
            } else {
                println(' importing data to test org.')
                dataimport = bat returnStdout: true, script: "${toolbelt}/sfdx force:data:tree:import --plan ./data/data-plan.json -u ${HUB_ORG} --json"
            }
            //println(dataimport)
            if (dataimport != 0) {
                println(dataimport)
            }
        }
        stage('Run Local Test Classes') {
            if (isUnix()) {
                testStatus = sh returnStdout: true, script: "${toolbelt}/sfdx force:apex:test:run --testlevel RunLocalTests -u ${HUB_ORG}"
            } else {
                //testStatus = sh returnStdout: true, script: "${toolbelt}/sfdx force:apex:test:run --testlevel RunLocalTests -u ${HUB_ORG} --json"
            }
            //println(testStatus)
        }
        stage('Open Target ORG') {
            if (isUnix()) {
                openorg = sh returnStdout: true, script: "${toolbelt}/sfdx force:org:open -u ${HUB_ORG} --json" 
            } else {
                openorg = bat returnStdout: true, script: "${toolbelt}/sfdx force:org:open -u ${HUB_ORG} --json"
            }
            println(openorg)
        }
        post {
            always {
                rc = sh returnStatus: true, script: "sfdx force:auth:logout -u ${HUB_ORG} -p"
                if (rc != 0) {
                        error 'Unable to log out of Production Org'
                    }               
            }
        }*/
    }
}
