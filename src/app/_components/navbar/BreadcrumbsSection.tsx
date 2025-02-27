import { Breadcrumbs, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

function MiddleBreadcrumb({
  key,
  label,
  href,
}: {
  key: string;
  label: string;
  href: string;
}) {
  return (
    <Link underline="hover" color="inherit" href={href} key={key}>
      {label}
    </Link>
  );
}

function LastBreadcrumb({ key, label }: { key: string; label: string }) {
  return (
    <Typography key={key} sx={{ color: "text.primary" }}>
      {label}
    </Typography>
  );
}

export default function BreadcrumbsSection() {
  let breadcrumbs = [
    <Link href="/" underline="hover" color="inherit" key="/">
      Inicio
    </Link>,
  ];
  const pathname = usePathname();
  if (pathname === "/citas/historial") {
    breadcrumbs.push(<LastBreadcrumb key={pathname} label="Historial" />);
  } else if (pathname.startsWith("/citas/historial/")) {
    breadcrumbs.push(
      <MiddleBreadcrumb
        key="/citas/historial"
        label="Historial"
        href="/citas/historial"
      />,
      <LastBreadcrumb key={pathname} label={pathname.split("/")[3]} />
    );
  } else if (pathname.startsWith("/citas/meet/")) {
    breadcrumbs.push(
      <MiddleBreadcrumb key="/citas" label="Citas" href="/citas" />,
      <LastBreadcrumb key={pathname} label="Sesión" />
    );
  } else if (pathname.startsWith("/citas/agendar/")) {
    breadcrumbs.push(
      <MiddleBreadcrumb
        key="/practicantes"
        label="Practicantes"
        href="/practicantes"
      />,
      <LastBreadcrumb key={pathname} label={pathname.split("/")[3]} />
    );
  } else {
    const pathnames = pathname.split("/").filter((x) => x);
    breadcrumbs.push(
      ...pathnames.map((pathname, index) => {
        pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return last ? (
          <Typography key={to} sx={{ color: "text.primary" }}>
            {pathname}
          </Typography>
        ) : (
          <Link underline="hover" color="inherit" href={to} key={to}>
            {pathname}
          </Link>
        );
      })
    );
  }
  return <Breadcrumbs sx={{ px: "15px" }}>{breadcrumbs}</Breadcrumbs>;
}
