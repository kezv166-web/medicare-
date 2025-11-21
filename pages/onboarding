import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MedicalIntakeOnboarding from "../components/onboarding/MedicalIntakeOnboarding";
import { createPageUrl } from "../utils";

export default function OnboardingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if onboarding is already completed
        const isCompleted = localStorage.getItem('onboarding_completed');
        if (isCompleted === 'true') {
            // If user manually navigates here after completion, redirect to home
            navigate(createPageUrl('Home'));
        }
    }, [navigate]);

    const handleComplete = (data) => {
        console.log("Onboarding completed with data:", data);
        // Navigate to home or dashboard after completion
        navigate(createPageUrl('Home'));
    };

    const handleSkip = () => {
        console.log("Onboarding skipped");
        // Navigate to home even if skipped
        navigate(createPageUrl('Home'));
    };

    return (
        <MedicalIntakeOnboarding
            onComplete={handleComplete}
            onSkip={handleSkip}
        />
    );
}