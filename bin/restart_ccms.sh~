 #!/bin/sh  
 date
 export JAVA_HOME=/home/ccms/java/jdk1.6.0_38
 export PATH=/home/ccms/java/jdk1.6.0_38/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
 export CLASSPATH=.:/home/ccms/java/jdk1.6.0_38/lib:/home/ccms/java/jdk1.6.0_38/jre/lib
 count="$#" 
 appName="$1"

if [ $# = 0 ]||[ "$appName" == "ccms" ];
then
{
 
 echo '--------RESTART CCMS2_TOMCAT--------BEGIN'
 cd /home/ccms/deploy/CCMS/CCMS2_TOMCAT
pid=`ps -aux|grep CCMS2_TOMCAT|grep -v grep|awk '{print$2}'`
echo OLD PID $pid  
if [ -n "$pid" ];
then  
{  
  # echo =========SHUTDOWN TOMCAT==================  
   ./bin/shutdown.sh  >/dev/null  
   sleep 1   
   pid=`ps -aux|grep CCMS2_TOMCAT|grep -v grep|awk '{print$2}'`  
   if [ -n "$pid" ];
   then  
    {  
      sleep 1   
    #  echo ========KILL TOMCAT PID:$pid==============    
      kill -9 $pid  
}
fi
   sleep 1  
  # echo ===========start CCMS2_TOMCAT==============  
   ./bin/startup.sh >/dev/null   
 }  
else  
#echo ===========NO CCMS2 THREAD FOUND£¬START CCMS2_TOMCAT==============  
./bin/startup.sh >/dev/null  
  
fi

	pid=`ps -aux|grep CCMS2_TOMCAT|grep -v grep|awk '{print$2}'`
echo NEW PID $pid  
echo --------RESTART CCMS2_TOMCAT--------END

}
fi


if [ $# = 0 ]||[ "$appName" == "sms" ];then
{
 echo '--------RESTART CCMS2_SMS--------BEGIN'
 cd /home/ccms/deploy/CCMS-SMS/SMS
pid=`ps -aux|grep SMS|grep -v grep|awk '{print$2}'`
echo OLD PID $pid  
if [ -n "$pid" ]; 
then  
{  
  # echo =========KILL SMS==================  
	kill -9 $pid 
   sleep 1  
   ./sms.sh >./sms_log 2>&1 &
 }  
else  
  ./sms.sh >./sms_log 2>&1 &
  
fi

	pid=`ps -aux|grep SMS|grep -v grep|awk '{print$2}'`
echo NEW PID $pid  
echo '--------RESTART CCMS2_SMS--------END'
echo 
}
fi

if [ $# = 0 ]||[ "$appName" == "mail" ];then
{
 echo '--------RESTART CCMS2_MAIL--------BEGIN'
 cd /home/ccms/deploy/CCMS_MAIL/MAIL
pid=`ps -aux|grep MAIL|grep -v grep|awk '{print$2}'`
echo OLD PID $pid  
if [ -n "$pid" ];
then  
{  
  # echo =========KILL MAIL==================  
	kill -9 $pid 
   sleep 1  
   ./mail.sh >./mail_log 2>&1 &
 }  
else  
  ./mail.sh >./mail_log 2>&1 &
  
fi

	pid=`ps -aux|grep MAIL|grep -v grep|awk '{print$2}'`
echo NEW PID $pid  
echo '--------RESTART CCMS2_MAIL--------END'
}
fi
