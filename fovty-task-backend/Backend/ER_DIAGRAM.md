# Database ER Diagram

## Users Collection

Fields:

* _id
* name
* email
* password
* phone
* bio
* profilePicture
* role
* isBlocked
* createdAt
* updatedAt

---

## PasswordResets Collection

Fields:

* _id
* userId
* token
* expiresAt

---

## OAuthProviders Collection

Fields:

* _id
* userId
* provider
* providerId

---

## ImpersonationLogs Collection

Fields:

* _id
* adminId
* userId
* startedAt
* endedAt
