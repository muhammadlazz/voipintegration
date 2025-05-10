require('dotenv').config();
const { Web, UserAgent } = require('sip.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const testKamailioConnection = async () => {
  try {
    console.log('Testing Kamailio connection...');
    
    // Get configuration from environment or user input
    const kamailioHost = process.env.KAMAILIO_HOST || await askQuestion('Enter Kamailio server IP: ');
    const kamailioPort = process.env.KAMAILIO_PORT || await askQuestion('Enter Kamailio port (default: 5060): ') || '5060';
    const kamailioRealm = process.env.KAMAILIO_REALM || await askQuestion('Enter Kamailio realm: ');
    const testUser = await askQuestion('Enter test user phone number: ');
    const testPassword = await askQuestion('Enter test user password: ');
    
    console.log(`\nConnecting to Kamailio at ${kamailioHost}:${kamailioPort} with user ${testUser}...`);
    
    // Create SIP URI
    const uri = Web.UserAgent.makeURI(`sip:${testUser}@${kamailioRealm}`);
    
    if (!uri) {
      throw new Error('Failed to create SIP URI');
    }
    
    // Create user agent
    const userAgent = new Web.UserAgent({
      uri,
      transportOptions: {
        server: `udp:${kamailioHost}:${kamailioPort}`
      },
      authorizationUsername: testUser,
      authorizationPassword: testPassword,
      displayName: `Test User ${testUser}`,
      contactParams: { transport: 'udp' },
      userAgentString: 'VoIP-Test-Client/1.0.0'
    });
    
    // Register event handlers
    userAgent.transport.onConnect = () => console.log('Transport connected!');
    userAgent.transport.onDisconnect = (error) => console.log('Transport disconnected:', error);
    
    // Start the user agent
    await userAgent.start();
    console.log('User agent started successfully');
    
    // Try to register
    const registerer = new Web.Registerer(userAgent);
    
    registerer.stateChange.addListener((state) => {
      console.log(`Registration state changed to: ${state}`);
    });
    
    try {
      console.log('Attempting to register...');
      await registerer.register();
      console.log('\n✅ SUCCESS: Successfully registered with Kamailio server!');
      console.log('Your Kamailio server is correctly configured for UDP SIP communication.');
    } catch (error) {
      console.error('\n❌ ERROR: Registration failed:', error.message);
      console.log('Please check your Kamailio server configuration and credentials.');
    }
    
    // Wait a moment then clean up
    setTimeout(async () => {
      try {
        await registerer.unregister();
        console.log('Unregistered successfully');
      } catch (err) {
        console.log('Error unregistering:', err.message);
      }
      
      await userAgent.stop();
      console.log('User agent stopped');
      rl.close();
    }, 5000);
    
  } catch (error) {
    console.error('Test failed:', error.message);
    rl.close();
  }
};

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

testKamailioConnection();