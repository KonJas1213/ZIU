import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface StatsCardProps {
  title: string;
  value: number;
  icon: SvgIconComponent;
  color: string;
  bgColor: string;
}

export default function StatsCard({ title, value, icon: Icon, color, bgColor }: StatsCardProps) {
  return (
    <article className="task-card">
      <Card sx={{ height: "100%", overflow: "hidden" }}>
        <div className="task-card__thumbnail" aria-hidden="true" />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box>
              <Typography variant="body2" color="text.secondary" className="task-card__meta" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4" fontWeight={700} sx={{ fontSize: "var(--font-h2)" }}>
                {value}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: bgColor, color, width: 48, height: 48 }}>
              <Icon />
            </Avatar>
          </Box>
        </CardContent>
      </Card>
    </article>
  );
}
