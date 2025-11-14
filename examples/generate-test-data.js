/**
 * Test Data Generator
 * Generates 5 applicants, applications for 1-5 faculties each, and uploads documents
 */

const DreamApply = require('../src/index.js');
const fs = require('fs');
const path = require('path');

// Initialize the SDK
const client = new DreamApply({
  apiKey: process.env.DREAMAPPLY_API_KEY || 'your-api-key-here',
  baseUrl: process.env.DREAMAPPLY_BASE_URL || 'https://yourinstance.dreamapply.com',
  options: {
    timeout: 30000
  }
});

/**
 * Generate a random string
 */
function randomString(length = 8) {
  return Math.random().toString(36).substring(2, length + 2);
}

/**
 * Generate a random email
 */
function randomEmail(firstName, lastName) {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${randomString(4)}@${domain}`;
}

/**
 * Generate a random phone number
 */
function randomPhone() {
  return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
}

/**
 * Generate a random date in the past
 */
function randomDate(start, end) {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime).toISOString().split('T')[0];
}

/**
 * Create a sample document file
 */
function createSampleDocument(filename, content = 'Sample Document Content') {
  const tempDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  const filePath = path.join(tempDir, filename);
  fs.writeFileSync(filePath, content);
  return filePath;
}

/**
 * Create a File-like object for Node.js
 * In Node.js 18+, we can use File from the global scope or create a Blob
 */
function createFileFromPath(filePath, filename, mimeType = 'text/plain') {
  const fileBuffer = fs.readFileSync(filePath);
  
  // For Node.js, we'll use a Blob or create a File-like object
  // Node.js 18+ has File support, but we'll use a compatible approach
  if (typeof File !== 'undefined') {
    return new File([fileBuffer], filename, { type: mimeType });
  } else {
    // Fallback: create a Blob and add name property
    const blob = new Blob([fileBuffer], { type: mimeType });
    blob.name = filename;
    return blob;
  }
}

/**
 * Generate test applicant data
 */
function generateApplicantData(index) {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Jessica', 'William', 'Ashley'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[index % lastNames.length];
  
  return {
    firstName: firstName,
    lastName: lastName,
    email: randomEmail(firstName, lastName),
    phone: randomPhone(),
    dateOfBirth: randomDate('1990-01-01', '2005-12-31'),
    nationality: ['US', 'UK', 'CA', 'AU', 'DE'][Math.floor(Math.random() * 5)],
    address: {
      street: `${Math.floor(Math.random() * 9999)} Main Street`,
      city: ['New York', 'London', 'Toronto', 'Sydney', 'Berlin'][Math.floor(Math.random() * 5)],
      state: ['NY', 'CA', 'TX', 'FL', 'IL'][Math.floor(Math.random() * 5)],
      postalCode: `${Math.floor(Math.random() * 90000) + 10000}`,
      country: 'US'
    }
  };
}

/**
 * Generate test application data
 */
function generateApplicationData(applicantId, programId, priority) {
  return {
    applicantId: applicantId,
    programId: programId,
    priority: priority,
    submissionDate: new Date().toISOString().split('T')[0],
    personalStatement: `This is a sample personal statement for priority ${priority} application. I am interested in this program because...`,
    additionalInfo: {
      previousEducation: 'Bachelor\'s Degree',
      workExperience: '2 years',
      interests: ['Research', 'Innovation', 'Technology']
    }
  };
}

/**
 * Generate document data
 */
function generateDocumentData(applicantId, applicationId, documentType, index) {
  return {
    applicantId: applicantId,
    applicationId: applicationId,
    type: documentType,
    name: `${documentType}_${index}.pdf`,
    description: `Sample ${documentType} document`
  };
}

/**
 * Main function to generate test data
 */
async function generateTestData() {
  console.log('🚀 Starting test data generation...\n');

  const results = {
    applicants: [],
    applications: [],
    documents: [],
    errors: []
  };

  try {
    // First, get available programs/faculties
    console.log('📋 Fetching available programs...');
    let programs;
    try {
      const programsResponse = await client.programs.list({ limit: 20 });
      programs = Array.isArray(programsResponse) ? programsResponse : programsResponse.data || programsResponse.items || [];
      
      if (programs.length === 0) {
        console.log('⚠️  No programs found. Creating mock program IDs...');
        programs = [
          { id: '1', name: 'Faculty of Engineering' },
          { id: '2', name: 'Faculty of Business' },
          { id: '3', name: 'Faculty of Arts' },
          { id: '4', name: 'Faculty of Science' },
          { id: '5', name: 'Faculty of Medicine' }
        ];
      }
    } catch (error) {
      console.log('⚠️  Could not fetch programs. Using mock program IDs...');
      programs = [
        { id: '1', name: 'Faculty of Engineering' },
        { id: '2', name: 'Faculty of Business' },
        { id: '3', name: 'Faculty of Arts' },
        { id: '4', name: 'Faculty of Science' },
        { id: '5', name: 'Faculty of Medicine' }
      ];
    }
    
    console.log(`✅ Found ${programs.length} programs\n`);

    // Generate 5 applicants
    for (let i = 0; i < 5; i++) {
      console.log(`\n👤 Creating applicant ${i + 1}/5...`);
      
      try {
        const applicantData = generateApplicantData(i);
        const applicant = await client.applicants.create(applicantData);
        results.applicants.push(applicant);
        console.log(`   ✅ Applicant created: ${applicant.firstName} ${applicant.lastName} (ID: ${applicant.id || applicant.data?.id || 'N/A'})`);

        const applicantId = applicant.id || applicant.data?.id || applicant._id;
        
        // Create applications for 1-5 faculties (applicant 1 gets 1, applicant 2 gets 2, etc.)
        const numApplications = i + 1;
        console.log(`   📝 Creating ${numApplications} application(s)...`);

        for (let j = 0; j < numApplications && j < programs.length; j++) {
          try {
            const program = programs[j];
            const applicationData = generateApplicationData(applicantId, program.id, j + 1);
            const application = await client.applications.create(applicationData);
            results.applications.push(application);
            
            const applicationId = application.id || application.data?.id || application._id;
            console.log(`      ✅ Application ${j + 1} created for ${program.name} (ID: ${applicationId || 'N/A'})`);

            // Upload documents for this application
            const documentTypes = ['transcript', 'cv', 'personal_statement', 'recommendation_letter', 'certificate'];
            const numDocuments = Math.min(3, documentTypes.length); // Upload 3 documents per application
            
            console.log(`      📄 Uploading ${numDocuments} document(s)...`);
            
            for (let k = 0; k < numDocuments; k++) {
              try {
                const docType = documentTypes[k];
                const docData = generateDocumentData(applicantId, applicationId, docType, k + 1);
                
                // Create a sample document file
                const docContent = `Sample ${docType} document for ${applicantData.firstName} ${applicantData.lastName}\nApplication ID: ${applicationId}\nDate: ${new Date().toISOString()}\n\nThis is a sample document for testing purposes.`;
                const filename = `${docType}_${k + 1}.txt`;
                const filePath = createSampleDocument(filename, docContent);
                
                // Create a File-like object for upload
                const file = createFileFromPath(filePath, filename, 'text/plain');
                
                // Upload document
                const document = await client.documents.upload(docData, file);
                results.documents.push(document);
                console.log(`         ✅ Document uploaded: ${docType} (ID: ${document.id || document.data?.id || document._id || 'N/A'})`);
                
                // Clean up temp file
                if (fs.existsSync(filePath)) {
                  fs.unlinkSync(filePath);
                }
                
                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 500));
              } catch (error) {
                const errorMsg = `Failed to upload document ${k + 1}: ${error.message}`;
                console.log(`         ❌ ${errorMsg}`);
                results.errors.push({
                  type: 'document_upload',
                  applicantId,
                  applicationId,
                  error: errorMsg
                });
              }
            }
            
            // Small delay between applications
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (error) {
            const errorMsg = `Failed to create application ${j + 1}: ${error.message}`;
            console.log(`      ❌ ${errorMsg}`);
            results.errors.push({
              type: 'application_creation',
              applicantId,
              error: errorMsg
            });
          }
        }
      } catch (error) {
        const errorMsg = `Failed to create applicant ${i + 1}: ${error.message}`;
        console.log(`   ❌ ${errorMsg}`);
        results.errors.push({
          type: 'applicant_creation',
          index: i + 1,
          error: errorMsg
        });
      }
    }

    // Summary
    console.log('\n\n' + '='.repeat(60));
    console.log('📊 TEST DATA GENERATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Applicants created: ${results.applicants.length}/5`);
    console.log(`✅ Applications created: ${results.applications.length}`);
    console.log(`✅ Documents uploaded: ${results.documents.length}`);
    console.log(`❌ Errors encountered: ${results.errors.length}`);
    
    if (results.errors.length > 0) {
      console.log('\n⚠️  Errors:');
      results.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. [${error.type}] ${error.error}`);
      });
    }

    // Save results to file
    const resultsPath = path.join(__dirname, 'test-data-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    console.log(`\n💾 Results saved to: ${resultsPath}`);

    // Clean up temp directory
    const tempDir = path.join(__dirname, 'temp');
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    console.log('\n✅ Test data generation completed!');
    
    return results;
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
    results.errors.push({
      type: 'fatal',
      error: error.message
    });
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  generateTestData()
    .then(() => {
      console.log('\n🎉 All done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Generation failed:', error);
      process.exit(1);
    });
}

module.exports = { generateTestData, generateApplicantData, generateApplicationData };

