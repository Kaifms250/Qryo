import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, Plus, Globe, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ProfileCustomizer } from "@/components/ProfileCustomizer";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AppNavbarProps {
  username: string;
  onCreateId: () => void;
}

export function AppNavbar({ username, onCreateId }: AppNavbarProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, updateProfile } = useUserProfile(username);
  const [showLang, setShowLang] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navItems = [
    {
      id: "home",
      icon: Home,
      label: t("nav.home", "Home"),
      onClick: () => navigate("/rooms"),
      active: location.pathname === "/rooms",
    },
    {
      id: "create",
      icon: Plus,
      label: t("nav.createId", "Create ID"),
      onClick: onCreateId,
      active: false,
      popped: true,
    },
    {
      id: "language",
      icon: Globe,
      label: t("nav.language", "Language"),
      onClick: () => setShowLang((v) => !v),
      active: showLang,
    },
    {
      id: "profile",
      icon: User,
      label: t("nav.profile", "Profile"),
      onClick: () => setShowProfile((v) => !v),
      active: showProfile,
    },
  ];

  // Mobile: bottom bar
  if (isMobile) {
    return (
      <>
        <nav className="fixed bottom-0 inset-x-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border px-2 pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-end justify-around py-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors min-w-[56px]",
                  item.popped && "-mt-4",
                  item.active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.popped ? (
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                    <item.icon className="h-5 w-5" />
                  </span>
                ) : (
                  <item.icon className="h-5 w-5" />
                )}
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Floating panels */}
        {showLang && (
          <div className="fixed bottom-20 right-4 z-50">
            <LanguageSwitcher />
          </div>
        )}
        {showProfile && (
          <div className="fixed bottom-20 right-4 z-50">
            <ProfileCustomizer profile={profile} onUpdate={updateProfile} />
          </div>
        )}
      </>
    );
  }

  // Desktop: right sidebar
  return (
    <>
      <nav className="fixed right-0 top-0 h-screen w-16 z-50 bg-card/95 backdrop-blur-lg border-s border-border flex flex-col items-center py-6 gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className={cn(
              "relative flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl transition-colors w-14",
              item.active
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            {item.popped ? (
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                <item.icon className="h-4 w-4" />
              </span>
            ) : (
              <item.icon className="h-5 w-5" />
            )}
            <span className="text-[9px] font-medium leading-none">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Floating panels */}
      {showLang && (
        <div className="fixed right-20 top-[calc(50%-40px)] z-50">
          <LanguageSwitcher />
        </div>
      )}
      {showProfile && (
        <div className="fixed right-20 top-[calc(50%+40px)] z-50">
          <ProfileCustomizer profile={profile} onUpdate={updateProfile} />
        </div>
      )}
    </>
  );
}
