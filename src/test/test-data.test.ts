export const testData = {
    issues: [
        {
            key: 'JIRA-123',
            summary: 'Test issue 1',
            status: 'Open',
            type: 'Bug',
            priority: 'High',
            source: {
                fields: {
                    issuetype: { iconUrl: 'https://example.com/bug-icon.png' },
                    priority: { name: 'High' },
                    summary: 'Test issue 1',
                    status: { name: 'Open' }
                }
            }
        },
        {
            key: 'JIRA-456',
            summary: 'Test issue 2',
            status: 'In Progress',
            type: 'Task',
            priority: 'Medium',
            source: {
                fields: {
                    issuetype: { iconUrl: 'https://example.com/task-icon.png' },
                    priority: { name: 'Medium' },
                    summary: 'Test issue 2',
                    status: { name: 'In Progress' }
                }
            }
        }
    ],
    instance: 'test.atlassian.net',
    username: 'testuser',
    token: 'testtoken'
};