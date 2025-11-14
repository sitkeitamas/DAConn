/**
 * Basic Usage Example
 * Demonstrates common operations with the DreamApply SDK
 */

const DreamApply = require('../src/index.js');

// Initialize the SDK
const client = new DreamApply({
  apiKey: process.env.DREAMAPPLY_API_KEY || 'your-api-key-here',
  baseUrl: process.env.DREAMAPPLY_BASE_URL || 'https://yourinstance.dreamapply.com',
  options: {
    timeout: 30000
  }
});

async function main() {
  try {
    console.log('DreamApply SDK - Basic Usage Example\n');

    // Example 1: Create an applicant
    console.log('1. Creating an applicant...');
    const applicant = await client.applicants.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890'
    });
    console.log('Applicant created:', applicant.id);

    // Example 2: Get applicant details
    console.log('\n2. Retrieving applicant details...');
    const applicantDetails = await client.applicants.getById(applicant.id);
    console.log('Applicant details:', applicantDetails);

    // Example 3: List programs
    console.log('\n3. Listing available programs...');
    const programs = await client.programs.list({ limit: 5 });
    console.log(`Found ${programs.length || 0} programs`);

    // Example 4: Submit an application (if programs exist)
    if (programs.length > 0) {
      console.log('\n4. Submitting an application...');
      const application = await client.applications.create({
        applicantId: applicant.id,
        programId: programs[0].id,
        priority: 1
      });
      console.log('Application submitted:', application.id);

      // Example 5: Update application status
      console.log('\n5. Updating application status...');
      await client.applications.updateStatus(application.id, 'under_review');
      console.log('Application status updated');
    }

    // Example 6: List applicants with pagination
    console.log('\n6. Listing applicants...');
    const applicants = await client.applicants.list({
      page: 1,
      limit: 10,
      sort: 'createdAt',
      order: 'desc'
    });
    console.log(`Retrieved ${applicants.length || 0} applicants`);

    // Example 7: Get webhook event types
    console.log('\n7. Getting available webhook events...');
    const eventTypes = await client.webhooks.getEventTypes();
    console.log('Available events:', eventTypes);

    console.log('\n✅ All examples completed successfully!');

  } catch (error) {
    if (error instanceof DreamApply.DreamApplyError) {
      console.error('❌ DreamApply API Error:');
      console.error('  Message:', error.message);
      console.error('  Status:', error.status);
      console.error('  Data:', error.data);
    } else {
      console.error('❌ Error:', error.message);
      console.error(error.stack);
    }
  }
}

// Run the example
if (require.main === module) {
  main();
}

module.exports = { main };

