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
            
            def deploymentStatus = 'Pending'
            while(deploymentStatus == 'Pending' || deploymentStatus == 'InProgress'){
                /*if(isUnix()){
                    statusDep = sh returnStdout: true, script: "${toolbelt}/sfdx force:mdapi:deploy:report -u ${HUB_ORG} --json"
                }else{
                    statusDep = bat returnStdout: true, script: "${toolbelt}/sfdx force:mdapi:deploy:report -u ${HUB_ORG} --json"
                }
            
                def statusList = statusDep.split('json')
                def jsonSlurper = new JsonSlurperClassic()
                def robj = jsonSlurper.parseText(statusList[1])
                println('Deployment Status -- ' +robj.result.status)
                
                deploymentStatus = robj.result.status
                if(deploymentStatus == 'Pending' || deploymentStatus == 'InProgress'){
                    sleep 10
                }*/
                
                if(isUnix()){
                    statusDep = sh returnStdout: true, script: "${toolbelt}/sfdx force:mdapi:deploy:report -u ${HUB_ORG}"
                }else{
                    statusDep = bat returnStdout: true, script: "${toolbelt}/sfdx force:mdapi:deploy:report -u ${HUB_ORG}"
                }
                println('statusDep --' +statusDep)
                deploymentStatus = 'done'
                if(deploymentStatus == 'Pending' || deploymentStatus == 'InProgress'){
                    sleep 10
                }
            }
        }
    }
}
