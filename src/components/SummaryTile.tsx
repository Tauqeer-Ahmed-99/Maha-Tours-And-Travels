import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

const SummaryTile = ({
  heading,
  content,
}: {
  heading: string;
  content: string | number;
}) => {
  return (
    <Card variant="soft">
      <CardContent>
        <Typography level="title-sm">{heading}</Typography>
        <Typography level="title-lg">{content}</Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryTile;
