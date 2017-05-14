vrun::
	. venv/bin/activate; python src/manage.py runserver 0.0.0.0:8000;
vrun-prd::
	. venv/bin/activate; python src/manage.py runserver 0.0.0.0:8000 --settings=settings.production;
run::
	python src/manage.py runserver 0.0.0.0:8000
run-prd::
	python src/manage.py runserver 0.0.0.0:8000 --settings=settings.production
