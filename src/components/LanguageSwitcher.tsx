import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Languages, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages } from "@/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const isRTL = i18n.dir() === 'rtl';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label={t('language.select')}
        >
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t('language.select')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={isRTL ? "start" : "end"}
        className="min-w-[150px]"
        sideOffset={4}
      >
        {Object.entries(languages).map(([code, { nativeName }]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            className={cn(
              "cursor-pointer flex items-center justify-between gap-2 px-3 py-2",
              "focus:bg-accent focus:text-accent-foreground",
              "hover:bg-accent hover:text-accent-foreground",
              currentLanguage === code && "bg-accent text-accent-foreground",
              isRTL && "text-right flex-row-reverse"
            )}
          >
            <span className="flex-1">
              {nativeName}
            </span>
            {currentLanguage === code && (
              <Check className="h-3 w-3 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;