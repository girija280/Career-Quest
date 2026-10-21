-- ================================================== --
-- PostgreSQL DDL Script for Career Quest Platform     --
-- ================================================== --

-- Enable UUID extension for secure Primary Keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================================== --
-- 1. USER AUTHENTICATION & CORE APP STATE TABLES     --
-- ================================================== --

CREATE TABLE users (
    id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE  users IS 'Core authentication entity. Passwords stored as bcrypt hashes.';
COMMENT ON COLUMN users.password_hash IS 'bcrypt hash — never store plaintext.';

CREATE TABLE profiles (
    id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id           UUID        REFERENCES users(id) ON DELETE CASCADE,
    persona           VARCHAR(50) NOT NULL
                          CHECK (persona IN ('12th Pass','B.Tech Graduate','M.Tech Passed','Job Seeker')),
    horizon_years     INT         NOT NULL CHECK (horizon_years BETWEEN 1 AND 10),
    -- e.g. {"jee_main": 94.5, "mht_cet": 98.2, "state_exam": 87.0}
    exam_scores       JSONB       NOT NULL DEFAULT '{}'::jsonb,
    financial_status  VARCHAR(20) NOT NULL CHECK (financial_status IN ('Low','Medium','High')),
    budget_ceiling    NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    preferred_location VARCHAR(150),
    created_at        TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_profiles_user ON profiles(user_id);

COMMENT ON COLUMN profiles.exam_scores IS 'JSONB map of exam_code → percentile. Extensible for any state exam.';

CREATE TABLE quiz_scores (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    -- 10 trait dimensions (0–15 range each based on 14 questions)
    abs_score   SMALLINT DEFAULT 0,   -- Abstraction appetite
    bld_score   SMALLINT DEFAULT 0,   -- Build vs. analyse
    sys_score   SMALLINT DEFAULT 0,   -- Systems vs. people
    mth_score   SMALLINT DEFAULT 0,   -- Math tolerance
    hw_score    SMALLINT DEFAULT 0,   -- Hardware affinity
    rsk_score   SMALLINT DEFAULT 0,   -- Risk appetite
    stm_score   SMALLINT DEFAULT 0,   -- Academic stamina
    amb_score   SMALLINT DEFAULT 0,   -- Ambiguity tolerance
    fin_score   SMALLINT DEFAULT 0,   -- Financial pressure
    cre_score   SMALLINT DEFAULT 0,   -- Creative/visual pull
    updated_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_quiz_scores_user ON quiz_scores(user_id);

-- ================================================== --
-- 2. ACADEMIC & CONTENT ENTITY TABLES                --
-- ================================================== --

CREATE TABLE branches (
    branch_id       SERIAL      PRIMARY KEY,
    branch_code     VARCHAR(20) UNIQUE NOT NULL,   -- e.g. 'aiml', 'cse', 'ece'
    branch_name     VARCHAR(100) NOT NULL,
    branch_type     VARCHAR(20)  NOT NULL DEFAULT 'classic'
                        CHECK (branch_type IN ('classic','emerging')),
    icon            VARCHAR(10),                   -- emoji
    description     TEXT,
    avg_package_min NUMERIC(12,2),                 -- ₹ per annum
    avg_package_max NUMERIC(12,2),
    demand_score    SMALLINT CHECK (demand_score BETWEEN 0 AND 100),
    trait_fit       TEXT[],                        -- e.g. ARRAY['ABS','MTH','BLD']
    key_skills      TEXT[],
    career_paths    TEXT[],
    created_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON COLUMN branches.trait_fit IS 'Array of trait codes that best align with this branch.';

CREATE TABLE specializations (
    spec_id         SERIAL       PRIMARY KEY,
    branch_id       INT          REFERENCES branches(branch_id) ON DELETE CASCADE,
    spec_code       VARCHAR(50)  UNIQUE NOT NULL,
    spec_name       VARCHAR(200) NOT NULL,
    spec_type       VARCHAR(20)  NOT NULL DEFAULT 'established'
                        CHECK (spec_type IN ('established','emerging')),
    description     TEXT,
    duration_months INT          NOT NULL DEFAULT 48,
    difficulty      NUMERIC(3,1) CHECK (difficulty BETWEEN 1.0 AND 5.0),
    tools           TEXT[],
    outcome_label   VARCHAR(200),
    created_at      TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_spec_branch ON specializations(branch_id);

CREATE TABLE colleges (
    college_id      SERIAL       PRIMARY KEY,
    college_name    VARCHAR(200) NOT NULL,
    location        VARCHAR(200) NOT NULL,
    college_type    VARCHAR(60)  NOT NULL, -- 'Govt / IIT', 'Deemed / Pvt', 'State Univ. Affiliated'
    tier            SMALLINT     NOT NULL CHECK (tier IN (1, 2, 3)),
    ranking         INT,
    annual_fee      NUMERIC(12,2),
    total_fee_4yr   NUMERIC(12,2),
    branches        TEXT[],
    cutoff_jee_main NUMERIC(5,2),
    cutoff_mht_cet  NUMERIC(5,2),
    entrance_exam   VARCHAR(100),
    has_scholarship BOOLEAN      DEFAULT FALSE,
    scholarships    TEXT[],
    avg_placement   NUMERIC(12,2),
    top_recruiters  TEXT[],
    facilities      TEXT[],
    college_tag     VARCHAR(30),  -- 'flagship', 'nit', 'autonomous', 'independent_exam', 'state'
    created_at      TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_colleges_tier ON colleges(tier);
CREATE INDEX idx_colleges_type ON colleges(college_type);

CREATE TABLE exams (
    exam_id    SERIAL       PRIMARY KEY,
    user_id    UUID         REFERENCES users(id) ON DELETE CASCADE,
    exam_name  VARCHAR(100) NOT NULL,
    exam_year  SMALLINT     NOT NULL,
    score      NUMERIC(6,2) NOT NULL,
    score_type VARCHAR(20)  DEFAULT 'percentile'
                    CHECK (score_type IN ('percentile','marks','rank','cgpa')),
    recorded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ================================================== --
-- 3. PATHWAYS, FINANCIAL PLANS & CAREER ROLES        --
-- ================================================== --

CREATE TABLE financial_plans (
    plan_id              SERIAL       PRIMARY KEY,
    user_id              UUID         REFERENCES users(id) ON DELETE CASCADE,
    college_id           INT          REFERENCES colleges(college_id) ON DELETE SET NULL,
    estimated_total_cost NUMERIC(14,2) NOT NULL,
    funding_source       VARCHAR(100),
    scholarship_amount   NUMERIC(12,2) DEFAULT 0,
    loan_amount          NUMERIC(12,2) DEFAULT 0,
    loan_interest_rate   NUMERIC(5,2),
    repayment_years      INT,
    monthly_emi          NUMERIC(10,2),
    net_family_burden    NUMERIC(14,2),
    risk_level           VARCHAR(20)  CHECK (risk_level IN ('Low','Medium','High','Very High')),
    notes                TEXT,
    created_at           TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pathways (
    pathway_id         SERIAL      PRIMARY KEY,
    user_id            UUID        REFERENCES users(id) ON DELETE CASCADE,
    financial_plan_id  INT         REFERENCES financial_plans(plan_id) ON DELETE SET NULL,
    branch_id          INT         REFERENCES branches(branch_id) ON DELETE SET NULL,
    spec_id            INT         REFERENCES specializations(spec_id) ON DELETE SET NULL,
    college_id         INT         REFERENCES colleges(college_id) ON DELETE SET NULL,
    start_level        VARCHAR(50) NOT NULL,   -- '12th Pass', 'B.Tech Year 1', etc.
    end_goal           VARCHAR(150) NOT NULL,   -- 'ML Engineer at Tier-1 MNC'
    timeline_years     INT         NOT NULL,
    effort_level       VARCHAR(30) CHECK (effort_level IN ('Light','Moderate','Intensive','Extreme')),
    -- JSONB arrays for flexibility
    courses_included   JSONB       DEFAULT '[]'::jsonb,
    colleges_eligible  JSONB       DEFAULT '[]'::jsonb,
    job_eligible       JSONB       DEFAULT '[]'::jsonb,
    upgrade_options    TEXT,
    created_at         TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pathways_user ON pathways(user_id);

CREATE TABLE job_cards (
    job_id         SERIAL       PRIMARY KEY,
    branch_id      INT          REFERENCES branches(branch_id) ON DELETE CASCADE,
    spec_id        INT          REFERENCES specializations(spec_id) ON DELETE SET NULL,
    job_title      VARCHAR(150) NOT NULL,
    industry       VARCHAR(100) NOT NULL,
    avg_salary_lpa NUMERIC(10,2) NOT NULL,
    growth_outlook VARCHAR(30),
    required_skills TEXT[],
    tier_eligible  SMALLINT[]   DEFAULT ARRAY[1,2,3],
    description    TEXT,
    created_at     TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP
);

-- Salary trajectory by tier × experience bracket
CREATE TABLE salary_trajectory (
    id             SERIAL      PRIMARY KEY,
    tier           SMALLINT    NOT NULL CHECK (tier IN (1,2,3)),
    experience_range VARCHAR(20) NOT NULL,  -- '0–2 yrs', '3–5 yrs', etc.
    salary_min     NUMERIC(12,2) NOT NULL,
    salary_avg     NUMERIC(12,2) NOT NULL,
    salary_max     NUMERIC(12,2) NOT NULL,
    typical_roles  TEXT[]
);

CREATE INDEX idx_salary_tier ON salary_trajectory(tier);

CREATE TABLE gamified_progress (
    progress_id         SERIAL      PRIMARY KEY,
    user_id             UUID        REFERENCES users(id) ON DELETE CASCADE,
    pathway_id          INT         REFERENCES pathways(pathway_id) ON DELETE CASCADE,
    current_level       SMALLINT    DEFAULT 1 CHECK (current_level BETWEEN 1 AND 9),
    milestones_achieved TEXT[],
    next_target         VARCHAR(200),
    completion_pct      SMALLINT    DEFAULT 0 CHECK (completion_pct BETWEEN 0 AND 100),
    completion_status   VARCHAR(30) DEFAULT 'In Progress'
                            CHECK (completion_status IN ('In Progress','Completed','Abandoned')),
    updated_at          TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ================================================== --
-- 4. USER SELECTIONS & CHOICE TRACKING               --
-- ================================================== --

CREATE TABLE user_selections (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID        REFERENCES users(id) ON DELETE CASCADE,
    chosen_branch    VARCHAR(50),                      -- branch_code FK
    chosen_spec      VARCHAR(50),                      -- spec_code FK
    chosen_college   INT         REFERENCES colleges(college_id) ON DELETE SET NULL,
    selected_tier    SMALLINT    CHECK (selected_tier IN (1,2,3)),
    -- Full history: {"branches": [{selected: true, label: "CSE"}, ...], "colleges": [...]}
    selection_history JSONB      NOT NULL DEFAULT '{}'::jsonb,
    created_at       TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_user_selections_user ON user_selections(user_id);
CREATE INDEX idx_user_selections_branch ON user_selections(chosen_branch);

-- ================================================== --
-- 5. AI EXPLANATION LOG (POST /api/explain-branch)   --
-- ================================================== --

CREATE TABLE ai_explanations (
    id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID        REFERENCES users(id) ON DELETE CASCADE,
    branch_code   VARCHAR(20) NOT NULL,
    fit_type      VARCHAR(50),
    reason_text   TEXT,
    key_insights  TEXT[],
    model_version VARCHAR(50) DEFAULT 'mock-v1',
    latency_ms    INT,
    created_at    TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_explanations_user ON ai_explanations(user_id);

-- ================================================== --
-- 6. UTILITY: Auto-update updated_at trigger         --
-- ================================================== --

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_user_selections_updated
    BEFORE UPDATE ON user_selections
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_quiz_scores_updated
    BEFORE UPDATE ON quiz_scores
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ================================================== --
-- 7. ROW-LEVEL SECURITY (RLS)                        --
-- ================================================== --

ALTER TABLE profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_scores      ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_selections  ENABLE ROW LEVEL SECURITY;
ALTER TABLE pathways         ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_plans  ENABLE ROW LEVEL SECURITY;
ALTER TABLE gamified_progress ENABLE ROW LEVEL SECURITY;

-- Users can only read and modify their own rows
CREATE POLICY own_profile     ON profiles         USING (user_id = current_setting('app.current_user_id')::uuid);
CREATE POLICY own_quiz        ON quiz_scores       USING (user_id = current_setting('app.current_user_id')::uuid);
CREATE POLICY own_selections  ON user_selections   USING (user_id = current_setting('app.current_user_id')::uuid);
CREATE POLICY own_pathways    ON pathways          USING (user_id = current_setting('app.current_user_id')::uuid);
CREATE POLICY own_fin_plans   ON financial_plans   USING (user_id = current_setting('app.current_user_id')::uuid);
CREATE POLICY own_progress    ON gamified_progress USING (user_id = current_setting('app.current_user_id')::uuid);

-- ================================================== --
-- END OF SCHEMA                                      --
-- ================================================== --
