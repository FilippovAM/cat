function getProgressData() {
    return [
        {
            "authorLogin": "User 1",
            "sessionId": 121,
            "avatar": "img/avatar-1.jpg",
            "info": {
                "total": 57,
                "completedTests": 5
            }
        },
        {
            "authorLogin": "User 2",
            "sessionId": 122,
            "avatar": "img/avatar-2.jpg",
            "info": {
                "total": 25,
                "completedTests": 0
            }
        },
        {
            "authorLogin": "User 3",
            "sessionId": 123,
            "avatar": "img/avatar-3.jpg",
            "info": {
                "total": 93,
                "completedTests": 0
            }
        }
    ]
}

function getLastData() {
    return [
        {
            "branchName ": "DVF-2505-structure-and-readme",
            "info": {
                "success": 54,
                "failed": 3,
                "total": 57,
                "sessionAmt": 2
            },
            "failed": [{
                "id": 10317,
                "name": "_qa_tests/core/polar_series/area/click.html",
                "reason": "Console messages 1",
                "tags": ["anyChart", "actualBug", "polar", "area", "interactive"]
            }, {
                "id": 10293,
                "name": "_qa_tests/core/polar_series/line/click.html",
                "reason": "Console messages 1",
                "tags": ["anyChart", "actualBug", "polar", "line", "interactive"]
            }, {
                "id": 10311,
                "name": "_qa_tests/core/polar_series/marker/click.html",
                "reason": "Console messages doesn't match",
                "tags": ["anyChart", "actualBug", "polar", "marker", "interactive"]
            }
            ]
        }
    ]
}