const query = {
    getIssue: `select a1.issueId, a1.userId, a1.labelId, a1.issueTitle, a1.writingTime, a1.status, a1.milestoneId, a1.milestoneTitle, a2.content, a2.color
    from (select I.ID as issueId, U.userId, L.labelId as labelId, I.title as issueTitle, writingTime, status, milestoneId, M.title as milestoneTitle from issue I, userIssueRelation U, labelIssueRelation L, milestone M 
    where U.issueId = I.ID and L.issueId = I.ID and M.ID = I.milestoneId) a1, label a2 where a1.labelId = a2.ID;`,
    getUserId: `select userId from user where userId=?;`,
    insertUser: `INSERT INTO user (userId, userPw) VALUES (?, ?);`,
    loginCheck: `select userId, userPw from user where userId=?;`,
}

module.exports = query;