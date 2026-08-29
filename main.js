/* =========================================================
ORVYNX
Gateway prototype
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

/* -----------------------------------------------------
   Navigation
----------------------------------------------------- */

const nav = document.querySelector(".nav");

function updateNavigation() {
    if (!nav) return;

    nav.classList.toggle("scrolled", window.scrollY > 10);
}

updateNavigation();

window.addEventListener("scroll", updateNavigation, {
    passive: true
});


/* -----------------------------------------------------
   Scroll reveal
----------------------------------------------------- */

const sections = document.querySelectorAll(
    ".statement, .product-section, .features, .developers, .gateway-demo, .cta"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.08
    }
);

sections.forEach((section) => {
    observer.observe(section);
});


/* -----------------------------------------------------
   Gateway
----------------------------------------------------- */

const agentSelect = document.getElementById("agentSelect");
const actionSelect = document.getElementById("actionSelect");
const checkButton = document.getElementById("checkRequest");

const resultBox = document.getElementById("consoleResult");
const activityLog = document.getElementById("activityLog");
const eventCount = document.getElementById("eventCount");

if (
    !agentSelect ||
    !actionSelect ||
    !checkButton ||
    !resultBox ||
    !activityLog ||
    !eventCount
) {
    return;
}


let events = [];


/* -----------------------------------------------------
   Policies
   
   This is the prototype policy engine.
   Later this can become a real backend/API.
   ----------------------------------------------------- */

const policies = {

    support: {
        read_customer: "allowed",
        send_email: "review",
        delete_data: "blocked",
        export_data: "blocked"
    },

    research: {
        read_customer: "allowed",
        send_email: "blocked",
        delete_data: "blocked",
        export_data: "review"
    },

    sales: {
        read_customer: "allowed",
        send_email: "allowed",
        delete_data: "blocked",
        export_data: "review"
    }

};


const actionNames = {
    read_customer: "Read customer data",
    send_email: "Send email",
    delete_data: "Delete data",
    export_data: "Export customer data"
};


const agentNames = {
    support: "Support Agent",
    research: "Research Agent",
    sales: "Sales Agent"
};


const policyMessages = {
    allowed: "This action is permitted by the agent policy.",
    review: "This action requires human approval before it can continue.",
    blocked: "This action is not permitted by the current agent policy."
};


/* -----------------------------------------------------
   Evaluate request
   ----------------------------------------------------- */

function evaluateRequest(agent, action) {

    const decision =
        policies[agent]?.[action] || "blocked";

    return {
        decision,
        agent: agentNames[agent],
        action: actionNames[action],
        message: policyMessages[decision]
    };
}


/* -----------------------------------------------------
   Display result
   ----------------------------------------------------- */

function showResult(result) {

    const labels = {
        allowed: "ALLOWED",
        review: "REVIEW",
        blocked: "BLOCKED"
    };

    const symbols = {
        allowed: "✓",
        review: "!",
        blocked: "×"
    };

    resultBox.innerHTML = `
        <div class="result-content result-${result.decision}">

            <div class="result-icon">
                ${symbols[result.decision]}
            </div>

            <div class="result-details">

                <div class="result-status">
                    ${labels[result.decision]}
                </div>

                <strong>
                    ${result.agent}
                    → ${result.action}
                </strong>

                <p>
                    ${result.message}
                </p>

            </div>

        </div>
    `;
}


/* -----------------------------------------------------
   Activity log
   ----------------------------------------------------- */

function renderActivityLog() {

    if (events.length === 0) {

        activityLog.innerHTML = `
            <div class="empty-log">
                No requests yet.
            </div>
        `;

        eventCount.textContent = "0 events";

        return;
    }


    activityLog.innerHTML = events
        .map((event) => {

            const labels = {
                allowed: "Allowed",
                review: "Review",
                blocked: "Blocked"
            };

            return `
                <div class="log-row">

                    <div class="log-indicator ${event.decision}">
                    </div>

                    <div class="log-info">

                        <strong>
                            ${event.agent}
                        </strong>

                        <span>
                            ${event.action}
                        </span>

                    </div>

                    <span class="log-status ${event.decision}">
                        ${labels[event.decision]}
                    </span>

                </div>
            `;

        })
        .join("");


    eventCount.textContent =
        `${events.length} ${events.length === 1 ? "event" : "events"}`;
}


/* -----------------------------------------------------
   Check request
   ----------------------------------------------------- */

checkButton.addEventListener("click", () => {

    const agent = agentSelect.value;
    const action = actionSelect.value;

    const result = evaluateRequest(agent, action);

    showResult(result);


    events.unshift({
        ...result,
        time: Date.now()
    });


    /*
     * Keep the activity panel readable.
     * The prototype stores the latest 8 events.
     */

    events = events.slice(0, 8);

    renderActivityLog();

});


/* -----------------------------------------------------
   Keyboard shortcut
   ----------------------------------------------------- */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" &&
        document.activeElement !== agentSelect &&
        document.activeElement !== actionSelect
    ) {
        checkButton.click();
    }

});

});
